import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";
import { Button } from "~/components/ui/button";
import { Container } from "~/components/ui/container";
import { Progress } from "~/components/ui/progress";
import { Text } from "~/components/ui/text";
import { IBook } from "~/interfaces/Book";
import { Linking } from "react-native";
import { cn } from "~/lib/utils";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { createReading } from "./api/readings/create-reading";
import { queryClient } from "~/lib/react-query";

export default function BookPage() {
  const params = useLocalSearchParams();
  const { id, title, full_path, pdf_full_path, redirect_url, synopsis } =
    params as unknown as Omit<IBook, "category">;

  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);

  const progressPercentage = (page / numberOfPages) * 100;

  const { mutateAsync: createReadingFn } = useMutation({
    mutationFn: createReading,
    mutationKey: ["create-reading"],
    async onSuccess(data) {
      Toast.show({
        type: "success",
        text1: data.message,
        text2: "🙋🏻‍♂️",
      });
      setIsSubmiting(false);
      queryClient.invalidateQueries({
        queryKey: ["get-readings"],
      });
    },
    async onError() {
      setIsSubmiting(false);
    },
  });

  return (
    <Container className="flex-1 gap-4">
      <Text className="text-center font-bold text-4xl">{title}</Text>

      <View className="flex-row justify-between gap-3">
        <Button
          className="flex-1"
          disabled={isSubmiting}
          isLoading={isSubmiting}
          onPress={async () => {
            setIsSubmiting(true);
            await createReadingFn({
              book_id: id,
            });
          }}>
          <Text>Iniciar leitura</Text>
        </Button>

        {redirect_url && (
          <Button
            disabled={isSubmiting}
            className="flex-1"
            variant="secondary"
            onPress={() => {
              Linking.openURL(redirect_url);
            }}>
            <Text>Comprar livro</Text>
          </Button>
        )}
      </View>

      <View className="flex-row gap-3 justify-between">
        <View className="flex-1">
          <Text className="text-sm text-center">Thumbnail:</Text>
          <Image
            alt={title}
            source={{ uri: full_path }}
            className="h-[250px] w-full"
          />
        </View>
        <View className="flex-1">
          <Text className="text-sm text-center">Capa:</Text>
          <Pdf
            trustAllCerts={false}
            source={{ uri: pdf_full_path }}
            singlePage
            style={{
              backgroundColor: "#00000000",
              height: 250,
              padding: 0,
            }}
          />
        </View>
      </View>

      <Text className="text-sm">{synopsis}</Text>

      {/* <View style={styles.container}>
        <Pdf
          trustAllCerts={false}
          style={{
            backgroundColor: "#00000000",
            width: Dimensions.get("window").width - 32,
            height: Dimensions.get("window").height - 256,
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            setNumberOfPages(numberOfPages);
            // console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            setPage(page);
            // console.log(`Current page: ${page}`);
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
          onPageSingleTap={(page) => {
            console.log(page);
          }}
        />
        <Progress value={progressPercentage} />
        <View className="flex-row justify-between w-full">
          <Text>
            Página {page}/{numberOfPages}
          </Text>
          <Text>{progressPercentage.toFixed(2)}% Lido</Text>
        </View>
      </View> */}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  pdf: {
    width: Dimensions.get("window").width - 32,
    height: 300,
  },
});
