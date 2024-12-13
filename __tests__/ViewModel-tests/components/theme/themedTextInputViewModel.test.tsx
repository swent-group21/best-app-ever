import { waitFor, renderHook } from "@testing-library/react-native";
import { Colors } from "@/constants/Colors";
import { useThemedTextInputViewModel } from "@/src/viewmodels/components/theme/ThemedTextInputViewModel";

// Test for the use ThemedTextInput ViewModel
describe("use ThemedTextInput ViewModel", () => {
  // Before each test, mock the console info and clear all mocks
  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("renders the right viewModel with default value", async () => {
    // Render the hook with a default color
    const { result } = renderHook(() =>
      useThemedTextInputViewModel({
        lightColor: undefined,
        darkColor: undefined,
        colorType: undefined,
        borderColorType: undefined,
      }),
    );

    await waitFor(() => {
      expect(result.current.color).toEqual(Colors["light"]["textPrimary"]);
      expect(result.current.borderColor).toEqual(
        Colors["light"]["textPrimary"],
      );
      expect(result.current.getInputProps("none")).toEqual({});
    });
  });

  it("renders the right withModel with defined value", async () => {
    // Test with a defined color
    const { result } = renderHook(() =>
      useThemedTextInputViewModel({
        colorType: "textSecondary",
        borderColorType: "white",
      }),
    );

    await waitFor(() => {
      expect(result.current.color).toEqual(Colors["light"]["textSecondary"]);
      expect(result.current.borderColor).toEqual(Colors["light"]["white"]);
      expect(result.current.getInputProps("none")).toEqual({});
    });
  });

  it("renders the right input props for emails", async () => {
    // Test with a defined color
    const { result } = renderHook(() =>
      useThemedTextInputViewModel({
        lightColor: undefined,
        darkColor: undefined,
        colorType: undefined,
        borderColorType: undefined,
      }),
    );

    await waitFor(() => {
      expect(result.current.getInputProps("email")).toEqual({
        autoComplete: "email",
        inputMode: "email",
        keyboardType: "email-address",
        autoCapitalize: "none",
        placeholder: "example@your.domain",
      });
      expect(result.current.getInputProps("password")).toEqual({
        autoComplete: "password",
        secureTextEntry: true,
        placeholder: "**********",
      });
    });
  });
});
