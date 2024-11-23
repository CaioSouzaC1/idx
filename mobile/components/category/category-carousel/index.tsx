import { useGetCategories } from "~/hooks/categories/use-get-categories";
import * as React from "react";
import { FlatList, View, Image, TouchableOpacity } from "react-native";
import { Text } from "~/components/ui/text";
import { Card } from "~/components/ui/card";
import { BookMarked } from "lucide-react-native";
import { useRouter } from "expo-router";
import { ICategory } from "~/interfaces/Category";

export default function CategoryCarousel() {
  const { categories } = useGetCategories({});
  const router = useRouter();

  return (
    <View className="items-center justify-center">
      <Text className="font-bold text-3xl my-4">Categorias</Text>
      {categories && (
        <FlatList
          data={categories.data.data}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }: { item: ICategory }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/category",
                  params: { ...item },
                })
              }>
              <Card className="p-2 mx-2 max-h-48">
                <View className="rounded-lg shadow-md w-72 relative">
                  <Image
                    source={{ uri: item.full_path }}
                    className="w-full h-44 rounded-lg absolute inset-0 opacity-25"
                    resizeMode="cover"
                  />
                  <Text className="w-full h-44 font-bold text-center text-xl align-middle">
                    {item.name}
                  </Text>
                  <View className="flex aspect-square h-10 items-center justify-center rounded-3xl bg-primary absolute top-0 right-0">
                    <BookMarked height={16} width={16} color="white" />
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
