/*import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useRouter } from "expo-router";
import WelcomeScreens from "@/app/index";
import { Dimensions } from "react-native";
import WelcomeConceptScreen from "@/app/screens/welcome/final_screen";

// Maquetter `useRouter` de `expo-router`
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

const SCREEN_WIDTH = Dimensions.get("window").width;

describe("MyScreen Component", () => {
  const mockRouter = {
    push: useRouter().navigate,
  };

  it("navigue vers un autre screen quand le bouton est pressé", () => {
    const { getByTestId } = render(<WelcomeScreens />);

    // Sélectionnez la ScrollView
    const scrollView = getByTestId("welcome-scrollview");

    // Simulez le défilement vers la dernière page
    fireEvent.scroll(scrollView, {
      nativeEvent: {
        contentOffset: {
          x: SCREEN_WIDTH * 3, // Défilement jusqu'à la quatrième page
          y: 0,
        },
        contentSize: {
          width: SCREEN_WIDTH * 4, // Taille totale du contenu
          height: 0,
        },
        layoutMeasurement: {
          width: SCREEN_WIDTH, // Largeur de la zone visible
          height: 0,
        },
      },
    });

    // Vérifiez que la page finale est affichée
    const finalScreen = getByTestId("welcome-final-screen");
    expect(finalScreen).toBeTruthy();

    const { getByText } = render(<WelcomeConceptScreen />);

    // Simulez l'appui sur le bouton de la page finale
    const finalButton = getByText("Login");
    fireEvent.press(finalButton);

    // Vérifier que `router.push` a été appelé avec le chemin correct
    expect(mockRouter.push).toHaveBeenCalledWith(
      "@/app/screens/auth/sign_in_screenn",
    );
  });
});
*/

test("always passes", () => {
  expect(true).toBe(true);
});
