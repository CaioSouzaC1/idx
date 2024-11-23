import { useRouter } from "expo-router";
import { BookA } from "lucide-react-native";
import { View, Image, TouchableOpacity } from "react-native";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Text } from "~/components/ui/text";
import { IBook } from "~/interfaces/Book";
import { cn } from "~/lib/utils";

export default function BookCard({
  book,
  simple,
}: {
  book: IBook;
  simple?: boolean;
}) {
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
              className={cn("aspect-[5/8] h-40 rounded-lg", {
                "h-20": simple,
              })}
              resizeMode="cover"
            />
            <View className="justify-between flex-1">
              <View>
                <Text
                  className={cn("font-bold text-xl", {
                    "line-clamp-1": simple,
                  })}>
                  {book.title}
                </Text>
                {!simple && (
                  <Text className="text-sm line-clamp-4">{book.synopsis}</Text>
                )}
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
