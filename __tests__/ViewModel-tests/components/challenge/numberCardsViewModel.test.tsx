import { renderHook } from "@testing-library/react-native";
import { useNumberCardsViewModel } from "@/src/viewmodels/components/challenge/NumberCardsViewModel";


describe("NumberCard ViewModel", () => {

  beforeEach(() => {
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.clearAllMocks();
  });

  it("renders correctly with default number", () => {
    const { result } = renderHook(() =>
      useNumberCardsViewModel({
        number: 0,
      }
      ),
    );
    expect(result.current.renderNumber).toEqual("00")
  });

  it("renders correctly with a single-digit number", () => {
    const { result } = renderHook(() =>
      useNumberCardsViewModel({
        number: 5,
      }
      ),
    );
    expect(result.current.renderNumber).toEqual("05")
  });

  it("renders correctly with a two-digit number", () => {
    const { result } = renderHook(() =>
      useNumberCardsViewModel({
        number: 12,
      }
      ),
    );
    expect(result.current.renderNumber).toEqual(12)
  });

  it("renders correctly with a negative number", () => {
    const { result } = renderHook(() =>
      useNumberCardsViewModel({
        number: -5,
      }
      ),
    );
    expect(result.current.renderNumber).toEqual("00")
  });


  it("renders correctly with large numbers", () => {
    const { result } = renderHook(() =>
      useNumberCardsViewModel({
        number: 12345,
      }
      ),
    );
    expect(result.current.renderNumber).toEqual(12345)
  });
});
