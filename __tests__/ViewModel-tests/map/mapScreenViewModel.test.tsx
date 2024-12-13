import { renderHook, waitFor } from "@testing-library/react-native";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import FirestoreCtrl, {
  DBChallenge,
  DBChallengeDescription,
} from "@/src/models/firebase/FirestoreCtrl";
import { useMapScreenViewModel } from "@/src/viewmodels/map/MapScreenViewModel";
import { GeoPoint } from "firebase/firestore";

// Mock FirestoreCtrl
jest.mock("@/src/models/firebase/FirestoreCtrl", () => {
  return jest.fn().mockImplementation(() => ({
    getKChallenges: jest.fn(() => []),
    getChallengeDescription: jest.fn(
      () =>
        ({
          title: "Description Test",
          description: "Description",
          endDate: new Date(2024, 1, 1, 0, 0, 0, 0),
        }) as DBChallengeDescription,
    ),
    getPostsByChallengeTitle: jest.fn(() => []),
  }));
});
const mockFirestoreCtrl = new FirestoreCtrl();

// Mock `expo-location`
jest.mock("expo-location", () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));

// Mock GeoPoint
jest.mock("firebase/firestore", () => {
  return {
    GeoPoint: jest.fn().mockImplementation((lat, lng) => ({
      latitude: lat,
      longitude: lng,
      isEqual: (other) => lat === other.latitude && lng === other.longitude,
      toJSON: () => ({ latitude: lat, longitude: lng }),
    })),
  };
});

const defaultLocation = new GeoPoint(43.6763, 7.0122);

const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
};

const mockDate = new Date();

describe("useMapScreenViewModel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should request location permissions and set user location on success", async () => {
    (requestForegroundPermissionsAsync as jest.Mock).mockResolvedValueOnce({
      status: "granted",
    });
    (getCurrentPositionAsync as jest.Mock).mockResolvedValueOnce({
      coords: {
        latitude: 48.8566,
        longitude: 2.3522,
      },
    });

    const { result } = renderHook(() =>
      useMapScreenViewModel(mockFirestoreCtrl, mockNavigation, undefined),
    );

    await waitFor(() => {
      expect(requestForegroundPermissionsAsync).toHaveBeenCalled();
      expect(getCurrentPositionAsync).toHaveBeenCalled();
      expect(result.current.permission).toBe(true);
      expect(result.current.userLocation.latitude).toBe(48.8566);
      expect(result.current.userLocation.longitude).toBe(2.3522);
    });
  });

  it("should set default location when permission is denied", async () => {
    // Mock console error
    jest.spyOn(console, "error").mockImplementationOnce(() => {});

    (requestForegroundPermissionsAsync as jest.Mock).mockResolvedValueOnce({
      status: "denied",
    });

    const undefined_firstLocation = undefined;

    const { result } = renderHook(() =>
      useMapScreenViewModel(
        mockFirestoreCtrl,
        mockNavigation,
        undefined_firstLocation,
      ),
    );

    await waitFor(() => {
      expect(result.current.permission).toBe(false);
      expect(result.current.userLocation.latitude).toBe(
        defaultLocation.latitude,
      );
      expect(result.current.userLocation.longitude).toBe(
        defaultLocation.longitude,
      );
    });
  });

  it("should set default location on error during location fetch", async () => {
    // Mock console error
    jest.spyOn(console, "error").mockImplementationOnce(() => {});

    (requestForegroundPermissionsAsync as jest.Mock).mockRejectedValueOnce(
      new Error("PermissionError"),
    );

    const undefined_firstLocation = undefined;

    const { result } = renderHook(() =>
      useMapScreenViewModel(
        mockFirestoreCtrl,
        mockNavigation,
        undefined_firstLocation,
      ),
    );

    await waitFor(() => {
      expect(result.current.permission).toBe(false);
      expect(result.current.userLocation.latitude).toBe(
        defaultLocation.latitude,
      );
      expect(result.current.userLocation.longitude).toBe(
        defaultLocation.longitude,
      );
    });
  });

  it("should fetch challenges with valid locations from Firestore", async () => {
    // Mock console error
    jest.spyOn(console, "error").mockImplementationOnce(() => {});

    const mockChallenges: DBChallenge[] = [
      {
        challenge_id: "1",
        caption: "Challenge 1",
        uid: "12345",
        date: mockDate,
        location: new GeoPoint(48.8566, 2.3522),
        challenge_description: "Description test",
      },
      {
        challenge_id: "2",
        caption: "Challenge 2",
        uid: "67890",
        date: mockDate,
        location: null, // Invalid location
        challenge_description: "Description test",
      },
    ];

    (
      mockFirestoreCtrl.getPostsByChallengeTitle as jest.Mock
    ).mockResolvedValueOnce(mockChallenges);

    const undefined_firstLocation = undefined;

    const { result } = renderHook(() =>
      useMapScreenViewModel(
        mockFirestoreCtrl,
        mockNavigation,
        undefined_firstLocation,
      ),
    );

    await waitFor(() => {
      expect(mockFirestoreCtrl.getPostsByChallengeTitle).toHaveBeenCalledWith(
        "Description Test",
      );
      expect(result.current.challengesWithLocation).toEqual([
        mockChallenges[0],
      ]); // Only valid locations should be included
    });
  });

  it("should handle errors during challenge fetching", async () => {
    // Mock console error
    jest.spyOn(console, "error").mockImplementationOnce(() => {});

    (mockFirestoreCtrl.getKChallenges as jest.Mock).mockRejectedValueOnce(
      new Error("FirestoreError"),
    );

    const undefined_firstLocation = undefined;

    const { result } = renderHook(() =>
      useMapScreenViewModel(
        mockFirestoreCtrl,
        mockNavigation,
        undefined_firstLocation,
      ),
    );

    await waitFor(() => {
      expect(mockFirestoreCtrl.getPostsByChallengeTitle).toHaveBeenCalledWith(
        "Description Test",
      );
      expect(result.current.challengesWithLocation).toEqual([]);
    });
  });

  it("should navigate back when navigateGoBack is called", async () => {
    // Mock console error
    jest.spyOn(console, "error").mockImplementationOnce(() => {});

    const undefined_firstLocation = undefined;

    const { result } = renderHook(() =>
      useMapScreenViewModel(
        mockFirestoreCtrl,
        mockNavigation,
        undefined_firstLocation,
      ),
    );

    await waitFor(() => {
      result.current.navigateGoBack();
    });

    expect(mockNavigation.goBack).toHaveBeenCalled();
  });
});
