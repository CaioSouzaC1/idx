import { useMutation } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";
import { Container } from "~/components/ui/container";
import { Progress } from "~/components/ui/progress";
import { Skeleton } from "~/components/ui/skeleton";
import { Text } from "~/components/ui/text";
import { useShowReading } from "~/hooks/readings/use-show-reading";
import { IBook } from "~/interfaces/Book";
import { updateReading } from "./api/readings/update-reading";
import { queryClient } from "~/lib/react-query";
import { cn } from "~/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { Button } from "~/components/ui/button";

export default function ReaderPage() {
  const params = useLocalSearchParams();

  const { id, title, pdf_full_path, page_count, lastPageRead } =
    params as unknown as Omit<IBook & { lastPageRead: number }, "category">;

  const [page, setPage] = useState<number>(lastPageRead);

  const progressPercentage = (page / page_count) * 100;

  const { mutateAsync: updateReadingFn } = useMutation({
    mutationFn: updateReading,
    mutationKey: ["update-reading"],
  });

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      queryClient.invalidateQueries({
        queryKey: ["get-readings"],
      });
    });

    return unsubscribe;
  }, [navigation, queryClient]);

  async function handlePaginate(page: number) {
    setPage(page);
    updateReadingFn({
      book_id: id,
      page,
    });
  }

  return (
    <Container className="flex-1 gap-4 justify-between min-h-[90vh]">
      <View>
        <View style={styles.container}>
          <View className="flex-row justify-between w-full h-8">
            <Text>
              Página {page}/{page_count}
            </Text>
            <Text>{progressPercentage.toFixed(2)}% Lido</Text>
          </View>
          <Progress
            indicatorClassName={cn("", {
              "bg-green-500": progressPercentage > 90,
            })}
            value={progressPercentage}
          />
          <Pdf
            page={parseInt(lastPageRead.toString())}
            trustAllCerts={false}
            style={{
              backgroundColor: "#00000000",
              width: Dimensions.get("window").width - 32,
              height: Dimensions.get("window").height - 256,
            }}
            onPageChanged={(page, numberOfPages) => {
              handlePaginate(page);
            }}
            onError={(error) => {
              console.log(error);
            }}
            onPressLink={(uri) => {
              // console.log(`Link pressed: ${uri}`);
            }}
            source={{ uri: pdf_full_path }}
            horizontal={true}
            enablePaging={true}
          />
        </View>
      </View>
      <View>
        <Text className="text-center font-bold text-sm">{title}</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
