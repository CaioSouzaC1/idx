import * as React from 'react';
import { View } from "react-native";
import { Card, CardContent } from "~/components/ui/card";
import LoginForm from "~/components/forms/LoginForm";
import { BookMarked } from "lucide-react-native";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <View className="flex-1 justify-center items-center gap-16 p-6 bg-secondary/30">
      <View className="flex gap-4 items-center">
        <View className="flex aspect-square h-32 items-center justify-center rounded-full bg-primary">
          <BookMarked height={64} width={64} color="white" />
        </View>
        <Text className="font-bold text-3xl">
          Livraria <Text className="text-primary text-3xl">i</Text>DX
        </Text>
      </View>
      <Card className="w-full pt-6 rounded-2xl">
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </View>
  );
}
