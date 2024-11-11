import { useRouter } from "expo-router";
import { BookA } from "lucide-react-native";
import { View, Image, TouchableOpacity } from "react-native";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { IBook } from "~/interfaces/Book";

export default function BookCard({ book }: { book: IBook }) {
  const router = useRouter();

  function handlePaginate() {
    const { category, ...bookDataWithoutCategory } = book;

    router.push({
      pathname: "/book",
      params: bookDataWithoutCategory,
    });
  }

  return (
    <View className="w-full mb-4">
      <TouchableOpacity onPress={() => handlePaginate()}>
        <Card className="p-4">
          <View className="flex-row gap-4">
            <Image
              source={{ uri: book.full_path }}
              className="aspect-[5/8] h-40 rounded-lg"
              resizeMode="cover"
            />
            <View className="justify-between flex-1">
              <View>
                <Text className="font-bold text-xl">{book.title}</Text>
                <Text className="text-sm line-clamp-4">{book.synopsis}</Text>
              </View>
              <View>
                <Button
                  size="sm"
                  className="gap-2 items-center flex-row"
                  onPress={() => handlePaginate()}>
                  <Text>Ver livro</Text>
                  <BookA height={16} width={16} color="white" />
                </Button>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </View>
  );
}
