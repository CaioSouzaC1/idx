import { Container } from "~/components/ui/container";
import { View, Image, ActivityIndicator, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Text } from "~/components/ui/text";
import { ICategory } from "~/interfaces/Category";
import { useGetBooks } from "~/hooks/books/use-get-books";
import { IBook } from "~/interfaces/Book";
import BookCard from "~/components/books/book-card";
import { BookDown } from "lucide-react-native";
import { useColorScheme } from "~/lib/useColorScheme";

export default function CategoryPage() {
  const { isDarkColorScheme } = useColorScheme();

  const params = useLocalSearchParams();
  const { id, name, description, full_path } = params as unknown as ICategory;

  const { books } = useGetBooks({
    category_id: id,
  });

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        className="gap-4">
        <View className="gap-4 items-center">
          <View className="flex-row gap-4 justify-between">
            <View>
              <Text className="font-semibold text-3xl ">{name}</Text>
              <Text className="max-w-xs line-clamp-4">{description}</Text>
            </View>
            <Image
              source={{ uri: full_path }}
              className="h-32 rounded aspect-square"
              resizeMode="cover"
            />
          </View>

          <View className="flex-row gap-2 items-center">
            <Text className="font-semibold text-lg">Livros</Text>
            <View className="flex-1 bg-foreground h-[1px]"></View>
            <BookDown
              height={16}
              width={16}
              color={!isDarkColorScheme ? "black" : "white"}
            />
          </View>

          <View className="pb-16 w-full">
            {books ? (
              books.data.total > 0 ? (
                <View className="w-full">
                  {books.data.data.map((book: IBook) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </View>
              ) : (
                <View>
                  <Text>👀 Nenhum livro encontrado</Text>
                </View>
              )
            ) : (
              <ActivityIndicator size="small" className="text-foreground" />
            )}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
