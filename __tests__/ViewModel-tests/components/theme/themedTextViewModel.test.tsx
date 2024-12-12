import { waitFor, renderHook } from "@testing-library/react-native";
import { Colors } from "@/constants/Colors";
import { useThemedTextViewModel } from "@/src/viewmodels/components/theme/ThemedTextViewModel";

// Test for the use ThemedText ViewModel
describe("use ThemedText ViewModel", () => {
  // Before each test, mock the console info and clear all mocks
  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("renders the right color with default value", async () => {
    // Render the hook with a default color
    const { result } = renderHook(() =>
      useThemedTextViewModel({
        colorType: undefined,
      }),
    );

    await waitFor(() => {
      expect(result.current.color).toEqual(Colors["light"]["textPrimary"]);
    });
  });

  it("renders the right color with defined value", async () => {
    // Test with a defined color
    const { result } = renderHook(() =>
      useThemedTextViewModel({
        colorType: "white",
      }),
    );

    await waitFor(() => {
      expect(result.current.color).toEqual(Colors["light"]["white"]);
    });
  });
});
