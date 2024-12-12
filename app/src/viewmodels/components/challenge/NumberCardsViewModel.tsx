const initialCardNumber = "00";
const initNumber = 0;
const slice = -2;

/**
 * The NumberCard ViewModel to help display a number card.
 * @param number : the number to display
 * @returns : a component for the number card
 */
export function useNumberCardsViewModel({
  number
}: {
  readonly number: number;
}
) {
  function numberText() {
    if (number && Math.sign(number) >= initNumber) {
      if (number.toString().length === 1) {
        return ("0" + number).slice(slice);
      } else {
        return number;
      }
    } else {
      return initialCardNumber;
    }
  }

  const renderNumber = numberText();

  return {renderNumber};
}
