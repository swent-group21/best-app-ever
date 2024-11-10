/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {//TODO: Change the colors to match the design
    textPrimary: '#ECEDEE',
    textSecondary: '#9BA1A6',
    backgroundPrimary: '#E6BC95',
    backgroundSecondary: '#F7E9D3',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    white: '#FBFAFA',
    transparent: 'transparent',
  },
  dark: {
    textPrimary: '#E6BC95',
    textSecondary: '#EB6424',
    backgroundPrimary: '#220901',
    backgroundSecondary: '#FFDAC6',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    white: '#FBFAFA',
    transparent: 'transparent',
  },
};
