import {
    waitFor,
    renderHook
  } from "@testing-library/react-native";
  import { Colors } from "@/constants/Colors";
import { useThemedViewModel } from "@/src/viewmodels/components/theme/ThemedViewModel";  
  
  // Test for the use ThemedView ViewModel
  describe("use ThemedView ViewModel", () => {
  
    // Before each test, mock the console info and clear all mocks
    beforeEach(() => {
      jest.spyOn(console, "info").mockImplementation(() => {});
      jest.clearAllMocks();
    });
  
  
    it("renders the right color with default value", async () => {
        // Render the hook with a default color
      const { result } = renderHook(() =>
        useThemedViewModel({
          colorType: undefined,
        }
        ),
      );
  
      await waitFor(() => {
        expect(result.current.backgroundColor).toEqual(Colors["light"]["backgroundPrimary"]);
      });
    });

    it("renders the right color with defined value", async () => {
        // Test with a defined color
      const { result } = renderHook(() =>
        useThemedViewModel({
          colorType: "white",
        }
        ),
      );
  
      await waitFor(() => {
        expect(result.current.backgroundColor).toEqual(Colors["light"]["white"]);
      });
    });
  
  });