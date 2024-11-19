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
import { Skeleton } from "~/components/ui/skeleton";
import { useState } from "react";
import Pagination from "~/components/ui/pagination";

export default function CategoryPage() {
  const { isDarkColorScheme } = useColorScheme();

  const [page, setPage] = useState<number>(1);

  const params = useLocalSearchParams();
  const { id, name, description, full_path } = params as unknown as ICategory;

  const { books } = useGetBooks({
    category_id: id,
    page,
  });

  return (
    <Container>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        className="gap-4">
        <View className="gap-4 items-center">
          <View className="flex-row gap-4 justify-between">
            <View className="flex-1">
              <Text className="font-semibold text-3xl">{name}</Text>
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

          <View className="w-full">
            {books ? (
              books.data.total > 0 ? (
                <View className="w-full">
                  {books.data.data.map((book: IBook) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </View>
              ) : (
                <View>
                  <Text className="text-center font-bold">
                    Nenhum livro encontrado 👀
                  </Text>
                </View>
              )
            ) : (
              Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-32 mb-4" />
              ))
            )}
          </View>
        </View>
        {books && (
          <Pagination
            pageIndex={page}
            setPage={setPage}
            totalCount={books.data.total}
            perPage={books.data.per_page}
          />
        )}
      </ScrollView>
    </Container>
  );
}
