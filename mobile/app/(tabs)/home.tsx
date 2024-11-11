import CategoryCarousel from "~/components/category/category-carousel";
import IconAndTextLogo from "~/components/logo/icon-and-text-logo";
import { Container } from "~/components/ui/container";

export default function HomePage() {
  return (
    <Container>
      {/* <IconAndTextLogo /> */}
      <CategoryCarousel />
    </Container>
  );
}
