import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  colorType?: keyof typeof Colors.light & keyof typeof Colors.dark;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'small' | 'smallSemiBold' | 'description' | 'superTitle';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  colorType,
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, colorType ?? "textPrimary");

  return (
    <Text
      style={[
        { color },
        type === 'superTitle' ? styles.superTitle : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'description' ? styles.description : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,

        type === 'default' ? styles.default : undefined,
        type === 'small' ? styles.small : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'smallSemiBold' ? styles.smallSemibold : undefined,
        type === 'link' ? styles.link : undefined,
        
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  superTitle: {
    fontSize: 67,
    fontWeight: '900',
    lineHeight: 61,
  },
  title: {
    fontSize: 56,
    fontWeight: '900',
  },
  subtitle: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  description : {
    fontSize: 25,
    fontWeight: '800',
  },

  default: {
    fontSize: 16,
  },
  small: {
    fontSize: 12,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  smallSemibold: {
    fontSize: 12,
    fontWeight: '600',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
