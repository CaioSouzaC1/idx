import Pdf from "react-native-pdf";
import CategoryCarousel from "~/components/category/category-carousel";
import IconAndTextLogo from "~/components/logo/icon-and-text-logo";
import { Container } from "~/components/ui/container";

export default function HomePage() {
  const url = "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf";

  return (
    <Container>
      <Pdf source={{ uri: url }} />
      {/* <IconAndTextLogo /> */}
      <CategoryCarousel />
    </Container>
  );
}
