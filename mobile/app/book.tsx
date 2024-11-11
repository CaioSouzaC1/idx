import { useLocalSearchParams } from "expo-router";
import { Container } from "~/components/ui/container";
import { Text } from "~/components/ui/text";
import { IBook } from "~/interfaces/Book";

export default function BookPage() {
  const params = useLocalSearchParams();
  const { id, title, full_path } = params as unknown as Omit<IBook, "category">;

  return (
    <Container>
      <Text>{title}</Text>
    </Container>
  );
}
