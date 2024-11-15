import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { Text } from "./text";
import { Button } from "./button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react-native";
import { useColorScheme } from "~/lib/useColorScheme";

export default function Pagination({
  pageIndex,
  totalCount,
  perPage = 20,
  setPage,
}: {
  pageIndex: number;
  totalCount: number;
  perPage?: number;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const pages = Math.ceil(totalCount / perPage) || 1;
  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-sm text-muted-foreground">
        Total de {totalCount} items
      </Text>
      <View className="flex items-center gap-2 flex-row">
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onPress={() => setPage(1)}
          disabled={pageIndex === 1}>
          <ChevronsLeft
            color={!isDarkColorScheme ? "black" : "white"}
            className="h-4 w-4"
          />
          <Text className="sr-only">First page </Text>
        </Button>

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onPress={() => setPage(pageIndex - 1)}
          disabled={pageIndex === 1}>
          <ChevronLeft
            color={!isDarkColorScheme ? "black" : "white"}
            className="h-4 w-4"
          />
          <Text className="sr-only">Previus page</Text>
        </Button>

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onPress={() => setPage(pageIndex + 1)}
          disabled={pageIndex === pages}>
          <ChevronRight
            color={!isDarkColorScheme ? "black" : "white"}
            className="h-4 w-4"
          />
          <Text className="sr-only">Next page</Text>
        </Button>

        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onPress={() => setPage(pages)}
          disabled={pageIndex === pages}>
          <ChevronsRight
            color={!isDarkColorScheme ? "black" : "white"}
            className="h-4 w-4"
          />
          <Text className="sr-only">Last page</Text>
        </Button>
      </View>
    </View>
  );
}
