import { waitFor, renderHook } from "@testing-library/react-native";
import { useBottomBarViewModel } from "@/src/viewmodels/components/navigation/BottomBarViewModel";
import { Colors } from "@/constants/Colors";

// Test for the use BottomBar ViewModel
describe("use Bottom Bar ViewModel", () => {
  // Before each test, mock the console info and clear all mocks
  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("renders the right color with default value", async () => {
    // Render the hook with a default color
    const { result } = renderHook(() => useBottomBarViewModel({}));

    await waitFor(() => {
      expect(result.current.color).toEqual(Colors["light"]["white"]);
    });
  });

  it("renders the right color with defined value", async () => {
    // Test with a defined color
    const { result } = renderHook(() =>
      useBottomBarViewModel({
        colorType: "textPrimary",
      }),
    );

    await waitFor(() => {
      expect(result.current.color).toEqual(Colors["light"]["textPrimary"]);
    });
  });
});
