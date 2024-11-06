import { View } from "react-native";
import { BookMarked } from "lucide-react-native";
import { Text } from "~/components/ui/text";

export default function IconAndTextLogo() {
  return (
    <View className="flex gap-4 items-center">
      <View className="flex aspect-square h-32 items-center justify-center rounded-full bg-primary">
        <BookMarked height={64} width={64} color="white" />
      </View>
      <Text className="font-bold text-3xl">
        Livraria <Text className="text-primary text-3xl">i</Text>DX
      </Text>
    </View>
  );
}
