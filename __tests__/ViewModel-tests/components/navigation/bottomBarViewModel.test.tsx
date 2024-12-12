import {
    waitFor,
    renderHook
  } from "@testing-library/react-native";
  import { useBottomBarViewModel } from "@/src/viewmodels/components/navigation/BottomBarViewModel";
  import { Colors } from "@/constants/Colors";
  
  
  describe("use Bottom Bar ViewModel", () => {
  
    beforeEach(() => {
      jest.spyOn(console, "info").mockImplementation(() => {});
      jest.clearAllMocks();
    });
  
  
    it("renders the right color with default value", async () => {
      const { result } = renderHook(() =>
        useBottomBarViewModel({
          colorType: "white",
        }
        ),
      );
  
      await waitFor(() => {
        expect(result.current.color).toEqual(Colors["light"]["white"]);
      });
    });

    it("renders the right color with defined value", async () => {
      const { result } = renderHook(() =>
        useBottomBarViewModel({
          colorType: "textPrimary",
        }
        ),
      );
  
      await waitFor(() => {
        expect(result.current.color).toEqual(Colors["light"]["textPrimary"]);
      });
    });
  
  });