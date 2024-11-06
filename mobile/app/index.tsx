import * as React from 'react';
import { View } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import LoginForm from "~/components/forms/login-form";
import IconAndTextLogo from "~/components/logo/icon-and-text-logo";

export default function Screen() {
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
