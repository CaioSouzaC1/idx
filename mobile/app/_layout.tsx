import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from "@rn-primitives/portal";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/lib/react-query";
import Toast from "react-native-toast-message";
import { AuthProvider } from "~/context/auth-context";
import HeaderRight from "~/components/navigation/header-right";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <AuthProvider>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen
              name="create-account"
              options={{
                headerBackVisible: true,
                title: "Criar Conta",
                headerRight: () => <HeaderRight />,
              }}
            />
            <Stack.Screen
              name="category"
              options={{
                title: "Categoria",
                headerRight: () => <HeaderRight />,
              }}
            />
            <Stack.Screen
              name="book"
              options={{
                title: "Livro",
                headerRight: () => <HeaderRight />,
              }}
            />
            <Stack.Screen
              name="reader"
              options={{
                title: "Lendo",
                headerRight: () => <HeaderRight />,
              }}
            />
          </Stack>
          <Toast />
        </QueryClientProvider>
        <PortalHost />
      </AuthProvider>
    </ThemeProvider>
  );
}
