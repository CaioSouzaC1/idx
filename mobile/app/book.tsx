import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, View } from "react-native";
import Pdf from "react-native-pdf";
import { Button } from "~/components/ui/button";
import { Container } from "~/components/ui/container";
import { Text } from "~/components/ui/text";
import { IBook } from "~/interfaces/Book";
import { Linking } from "react-native";
import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { createReading } from "./api/readings/create-reading";
import { queryClient } from "~/lib/react-query";
import { useShowReading } from "~/hooks/readings/use-show-reading";
import { showReading } from "./api/readings/show-reading";
import { cn } from "~/lib/utils";

export default function BookPage() {
  const params = useLocalSearchParams();
  const { id, title, full_path, pdf_full_path, redirect_url, synopsis } =
    params as unknown as Omit<IBook, "category">;

  const router = useRouter();

  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

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
      await showReadingFn({
        book_id: id,
      });
    },
    async onError() {
      setIsSubmiting(false);
    },
  });

  const { mutateAsync: showReadingFn } = useMutation({
    mutationFn: showReading,
    mutationKey: ["show-reading"],
    async onSuccess(data) {
      router.push({
        pathname: "/reader",
        params: {
          ...params,
          lastPageRead: data.data!.page,
        } as unknown as Omit<IBook & { lastPageRead: number }, "category">,
      });
    },
    async onError() {
      setIsSubmiting(false);
    },
  });

  const { reading } = useShowReading({
    book_id: id,
  });

  async function handleStartRead() {
    if (!reading) return;
    if (!reading.data) {
      setIsSubmiting(true);
      await createReadingFn({
        book_id: id,
      });
    }
    router.push({
      pathname: "/reader",
      params: {
        ...params,
        lastPageRead: reading.data!.page,
      } as unknown as Omit<IBook & { lastPageRead: number }, "category">,
    });
  }

  return (
    <Container className="flex-1 gap-4 justify-between min-h-[90vh]">
      <View className="gap-4">
        <Text className="text-center font-bold text-4xl mb-4">{title}</Text>

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

        <Text className="text-sm text-center">{synopsis}</Text>
      </View>

      <View className="flex-row justify-between flex-wrap">
        <View
          className={cn("flex-1", {
            "pr-2": redirect_url,
          })}>
          <Button
            className="w-full"
            disabled={isSubmiting || !reading}
            isLoading={isSubmiting || !reading}
            onPress={() => handleStartRead()}>
            <Text>
              {reading
                ? !reading.data
                  ? "Iniciar leitura"
                  : "Continuar leitura"
                : "Carregando..."}
            </Text>
          </Button>
        </View>

        {redirect_url && (
          <View className="pl-2 w-1/2">
            <Button
              disabled={isSubmiting}
              className="w-full"
              variant="secondary"
              onPress={() => {
                Linking.openURL(redirect_url);
              }}>
              <Text>Comprar livro</Text>
            </Button>
          </View>
        )}
      </View>
    </Container>
  );
}
