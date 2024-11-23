import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { useGetMostReadBooks } from "~/hooks/books/use-get-most-read-books";
import { IBook } from "~/interfaces/Book";
import BookCard from "../book-card";
import { Skeleton } from "~/components/ui/skeleton";
import { IRead } from "~/interfaces/Reading";

export default function MostReadBookList() {
  const { books } = useGetMostReadBooks({
    day_quantity: 30,
  });

  return (
    <View>
      <Text className="text-center font-bold text-xl mt-8 mb-4">
        Livros mais lidos
      </Text>
      {books
        ? books.data.data.map((read: IRead, i: number) => (
            <BookCard simple={true} key={`${read.id}-${i}`} book={read.book} />
          ))
        : Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-20 mb-4" />
          ))}
    </View>
  );
}
