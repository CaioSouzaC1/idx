import AsyncStorage from "@react-native-async-storage/async-storage";
import { LogOut, MoonStar, Sun } from "lucide-react-native";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { Button } from "~/components/ui/button";
import { useAuth } from "~/context/auth-context";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { useColorScheme } from "~/lib/useColorScheme";

export default function HeaderRight() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  const { logout } = useAuth();

  return (
    <View className="flex-row gap-4 pr-2">
      <Button
        onPress={() => {
          const newTheme = isDarkColorScheme ? "light" : "dark";
          setColorScheme(newTheme);
          setAndroidNavigationBar(newTheme);
          AsyncStorage.setItem("theme", newTheme);
        }}
        variant="outline"
        className="w-12">
        <View className="flex-1 justify-center items-center w-8 web:px-5">
          {isDarkColorScheme ? (
            <MoonStar
              className="text-foreground"
              height={22}
              width={22}
              color={!isDarkColorScheme ? "black" : "white"}
              strokeWidth={1.25}
            />
          ) : (
            <Sun
              className="text-foreground"
              height={22}
              width={22}
              color={!isDarkColorScheme ? "black" : "white"}
              strokeWidth={1.25}
            />
          )}
        </View>
      </Button>
      <Button
        onPress={() => {
          logout();
          Toast.show({
            type: "info",
            text1: "Deslogado com sucesso.",
          });
        }}
        variant="outline"
        className="w-12">
        <View className="flex-1 justify-center items-center w-8 web:px-5">
          <LogOut
            className="text-foreground"
            height={22}
            width={22}
            color={!isDarkColorScheme ? "black" : "white"}
            strokeWidth={1.25}
          />
        </View>
      </Button>
    </View>
  );
}
