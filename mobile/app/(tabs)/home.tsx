import { View } from "react-native";
import IconAndTextLogo from "~/components/logo/icon-and-text-logo";
import { Container } from "~/components/ui/container";
import { Text } from "~/components/ui/text";

export default function HomePage() {
  return (
    <Container>
      <IconAndTextLogo />
      <View>
        <Text>Livros.....</Text>
      </View>
    </Container>
  );
}
