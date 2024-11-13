import { Image, TouchableOpacity, View } from "react-native";
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

export default function MyReadingsPage() {
  const { readings } = useGetReadings({});

  if (readings) {
    console.log(readings.data.data[0]);
  }

  async function handlePaginate() {}

  return (
    <Container>
      <View className="gap-4">
        {readings ? (
          readings.data.total > 0 ? (
            readings.data.data.map((read: IRead) => (
              <TouchableOpacity key={read.id} onPress={() => handlePaginate()}>
                <Card className="w-full flex-row justify-between items-center gap-4 px-4">
                  <CardHeader className="px-0">
                    <CardTitle>{read.book.title}</CardTitle>
                    <CardDescription>
                      {read.page} Páginas lidas - {read.book.category.name}
                    </CardDescription>
                  </CardHeader>
                  <View>
                    <Image
                      className="aspect-square h-12 rounded"
                      alt={read.book.title}
                      source={{ uri: read.book.full_path }}
                    />
                  </View>
                </Card>
              </TouchableOpacity>
            ))
          ) : (
            <Text>👀 Você ainda não começou a ler nenhum livro</Text>
          )
        ) : (
          Array.from({ length: 10 }).map((_, i) => (
            <Skeleton className="w-full h-12" />
          ))
        )}
      </View>
    </Container>
  );
}
