import { waitFor, renderHook } from "@testing-library/react-native";
import { Colors } from "@/constants/Colors";
import { useThemedTextButtonViewModel } from "@/src/viewmodels/components/theme/ThemedTextButtonViewModel";

// Test for the use ThemedTextButton ViewModel
describe("use ThemedTextButton ViewModel", () => {
  // Before each test, mock the console info and clear all mocks
  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("renders the right color with default value", async () => {
    // Render the hook with a default color
    const { result } = renderHook(() =>
      useThemedTextButtonViewModel({
        colorType: undefined,
      }),
    );

    await waitFor(() => {
      expect(result.current.color).toEqual(
        Colors["light"]["backgroundSecondary"],
      );
    });
  });

  it("renders the right color with defined value", async () => {
    // Test with a defined color
    const { result } = renderHook(() =>
      useThemedTextButtonViewModel({
        colorType: "textPrimary",
      }),
    );

    await waitFor(() => {
      expect(result.current.color).toEqual(Colors["light"]["textPrimary"]);
    });
  });
});
