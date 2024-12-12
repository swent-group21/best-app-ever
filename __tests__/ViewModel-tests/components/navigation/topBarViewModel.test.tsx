import { waitFor, renderHook } from "@testing-library/react-native";
import { useTopBarViewModel } from "@/src/viewmodels/components/navigation/TopBarViewModel";
import { Colors } from "@/constants/Colors";

// Test for the use TopBar ViewModel
describe("use Top Bar ViewModel", () => {
  // Before each test, mock the console info and clear all mocks
  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("renders the right color with default value and profile pictures", async () => {
    const mockLeftIcon = "https://example.com/image.jpg";
    const mockRightIcon = "http://example.com/image.jpg";
    // Render the hook with a default color
    const { result } = renderHook(() =>
      useTopBarViewModel({
        leftIcon: mockLeftIcon,
        rightIcon: mockRightIcon,
        colorType: "white",
      }),
    );

    // Wait for the hook to finish rendering
    await waitFor(() => {
      expect(result.current.color).toEqual(Colors["light"]["white"]);
      expect(result.current.isLeftPP(mockLeftIcon)).toBeTruthy();
      expect(result.current.isRightPP(mockRightIcon)).toBeTruthy();
    });
  });

  it("renders the right color with defined value and only left profile picture", async () => {
    const mockLeftIcon = "http://example.com/image.jpg";
    const mockRightIcon = "NothingToSeeHere";

    // Test with a defined color
    const { result } = renderHook(() =>
      useTopBarViewModel({
        leftIcon: mockLeftIcon,
        rightIcon: mockRightIcon,
        colorType: "textPrimary",
      }),
    );

    // Wait for the hook to finish rendering
    await waitFor(() => {
      expect(result.current.color).toEqual(Colors["light"]["textPrimary"]);
      expect(result.current.isLeftPP(mockLeftIcon)).toBeTruthy();
      expect(result.current.isRightPP(mockRightIcon)).toBeFalsy();
    });
  });
});
