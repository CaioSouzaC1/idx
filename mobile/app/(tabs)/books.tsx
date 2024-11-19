import { useState } from "react";
import { ScrollView, View } from "react-native";
import BookCard from "~/components/books/book-card";
import InputSearch from "~/components/search/input-search";
import { Container } from "~/components/ui/container";
import Pagination from "~/components/ui/pagination";
import { Skeleton } from "~/components/ui/skeleton";
import { useGetBooks } from "~/hooks/books/use-get-books";
import { IBook } from "~/interfaces/Book";

export default function BooksPages() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const { books } = useGetBooks({
    search,
    page,
  });

  return (
    <Container className="gap-4">
      <View className="h-8">
        <InputSearch
          placeholder="Ordem da fenix"
          setSearch={setSearch}
          setPage={setPage}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        className="gap-4">
        <View>
          {books
            ? books.data.data.map((book: IBook) => (
                <BookCard key={book.id} book={book} />
              ))
            : Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-20 mb-4" />
              ))}
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
