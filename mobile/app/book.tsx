import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf";
import { Container } from "~/components/ui/container";
import { Progress } from "~/components/ui/progress";
import { Text } from "~/components/ui/text";
import { IBook } from "~/interfaces/Book";
import { useColorScheme } from "~/lib/useColorScheme";

export default function BookPage() {
  const params = useLocalSearchParams();
  const { id, title, full_path, pdf_full_path } = params as unknown as Omit<
    IBook,
    "category"
  >;

  const [page, setPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);

  const progressPercentage = (page / numberOfPages) * 100;

  return (
    <Container className="flex-1">
      <Text>{title}</Text>
      <View style={styles.container}>
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
  pdf: {
    width: Dimensions.get("window").width - 32,
    height: 300,
  },
});