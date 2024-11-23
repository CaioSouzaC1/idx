import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import { Container } from "~/components/ui/container";
import { Text } from "~/components/ui/text";
import { useGetReadings } from "~/hooks/readings/use-get-readings";
import { IRead } from "~/interfaces/Reading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { useRouter } from "expo-router";
import { IBook } from "~/interfaces/Book";
import { cn } from "~/lib/utils";
import { BookCheck } from "lucide-react-native";
import { useState } from "react";
import Pagination from "~/components/ui/pagination";
import InputSearch from "~/components/search/input-search";

export default function MyReadingsPage() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const { readings } = useGetReadings({
    search,
    page,
  });

  const router = useRouter();

  async function handlePaginate(
    book: Omit<IBook & { lastPageRead: number }, "category">
  ) {
    router.push({
      pathname: "/reader",
      params: { ...book },
    });
  }

  return (
    <Container className="gap-4">
      <View className="h-8">
        <InputSearch
          placeholder="Gato de botas"
          setSearch={setSearch}
          setPage={setPage}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        className="gap-4">
        <View className="gap-4">
          {readings ? (
            readings.data.total > 0 ? (
              readings.data.data.map((read: IRead) => {
                const { category, ...bookWithoutCategory } = read.book;
                const progressPercentage =
                  (read.page / read.book.page_count) * 100;
                const bookIsRead = progressPercentage > 90;
                return (
                  <TouchableOpacity
                    key={read.id}
                    onPress={() =>
                      handlePaginate({
                        ...bookWithoutCategory,
                        lastPageRead: read.page,
                      })
                    }>
                    <Card
                      className={cn(
                        "w-full flex-row justify-between items-center gap-4 px-4 relative",
                        {
                          "border-green-500 shadow-2xl": bookIsRead,
                        }
                      )}>
                      <CardHeader className="px-0">
                        <CardTitle className="line-clamp-1 max-w-[82%]">
                          {read.book.title}
                        </CardTitle>
                        <CardDescription>
                          {read.book.category.name}
                        </CardDescription>
                        <CardDescription>
                          {read.page} de {read.book.page_count} páginas lidas -{" "}
                          <Text
                            className={cn("text-sm text-muted-foreground", {
                              "text-green-500": bookIsRead,
                            })}>
                            {progressPercentage.toFixed(2)}% completo.
                          </Text>
                        </CardDescription>
                      </CardHeader>
                      <View>
                        <Image
                          className="aspect-square h-20 rounded"
                          alt={read.book.title}
                          source={{ uri: read.book.full_path }}
                        />
                      </View>
                      {bookIsRead && (
                        <View className="h-8 w-8 rounded-full bg-green-500 justify-center items-center absolute top-1 right-1">
                          <BookCheck height={16} width={16} color="white" />
                        </View>
                      )}
                    </Card>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text className="text-center my-4">
                👀 Você ainda não começou a ler nenhum livro
              </Text>
            )
          ) : (
            Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-24" />
            ))
          )}
        </View>
        <View className="mt-4">
          {readings && (
            <Pagination
              pageIndex={page}
              setPage={setPage}
              totalCount={readings.data.total}
              perPage={readings.data.per_page}
            />
          )}
        </View>
      </ScrollView>
    </Container>
  );
}
