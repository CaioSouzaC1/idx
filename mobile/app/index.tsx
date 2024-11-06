import { View } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import LoginForm from "~/components/forms/login-form";
import IconAndTextLogo from "~/components/logo/icon-and-text-logo";
import { useAuth } from "~/context/auth-context";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Screen() {
  const { isAuthenticated } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated, router]);

  return (
    <View className="flex-1 justify-center items-center gap-16 p-6 bg-secondary/30">
      <IconAndTextLogo />
      <Card className="w-full pt-6 rounded-2xl">
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </View>
  );
}
