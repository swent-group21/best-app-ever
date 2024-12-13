import { waitFor, renderHook } from "@testing-library/react-native";
import { Colors } from "@/constants/Colors";
import { useThemedIconButtonViewModel } from "@/src/viewmodels/components/theme/ThemedIconButtonViewModel";

// Test for the use ThemedIconButton ViewModel
describe("use ThemedIconButton ViewModel", () => {
  // Before each test, mock the console info and clear all mocks
  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("renders the right color with default value", async () => {
    // Render the hook with a default color
    const { result } = renderHook(() =>
      useThemedIconButtonViewModel({
        colorType: undefined,
      }),
    );

    await waitFor(() => {
      expect(result.current.color).toEqual(
        Colors["light"]["backgroundPrimary"],
      );
    });
  });

  it("renders the right color with defined value", async () => {
    // Test with a defined color
    const { result } = renderHook(() =>
      useThemedIconButtonViewModel({
        colorType: "textPrimary",
      }),
    );

    await waitFor(() => {
      expect(result.current.color).toEqual(Colors["light"]["textPrimary"]);
    });
  });
});
