import { ScrollView } from "react-native";
import MostReadBookList from "~/components/books/most-read-books-list";
import CategoryCarousel from "~/components/category/category-carousel";
import { Container } from "~/components/ui/container";

export default function HomePage() {
  return (
    <Container className="gap-4">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        className="gap-4">
        <CategoryCarousel />
        <MostReadBookList />
      </ScrollView>
    </Container>
  );
}
