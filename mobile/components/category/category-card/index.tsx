import { useRouter } from "expo-router";
import { SquareLibrary } from "lucide-react-native";
import { View, Image, TouchableOpacity } from "react-native";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { ICategory } from "~/interfaces/Category";

export default function CategoryCard({ category }: { category: ICategory }) {
  const router = useRouter();

  function handlePaginate() {
    router.push({
      pathname: "/category",
      params: { ...category },
    });
  }

  return (
    <View className="w-full mb-4">
      <TouchableOpacity onPress={() => handlePaginate()}>
        <Card className="p-4">
          <View className="flex-row gap-4">
            <View className="justify-between flex-1">
              <View>
                <Text className="font-bold text-xl">{category.name}</Text>
                <Text className="text-sm line-clamp-4">
                  {category.description}
                </Text>
              </View>
              <View>
                <Button
                  size="sm"
                  className="gap-2 items-center flex-row"
                  onPress={() => handlePaginate()}>
                  <Text>Ver Categoria</Text>
                  <SquareLibrary height={16} width={16} color="white" />
                </Button>
              </View>
            </View>
            <Image
              source={{ uri: category.full_path }}
              className="aspect-[5/8] h-40 rounded-lg"
              resizeMode="cover"
            />
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
}
