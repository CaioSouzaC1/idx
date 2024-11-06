import { View } from "react-native";
import CreateAccountForm from "~/components/forms/create-account-form";
import IconAndTextLogo from "~/components/logo/icon-and-text-logo";
import { Card, CardContent } from "~/components/ui/card";

export default function CreateAccountPage() {
  return (
    <View className="flex-1 justify-center items-center gap-16 p-6 bg-secondary/30">
      <IconAndTextLogo />

      <Card className="w-full pt-6 rounded-2xl">
        <CardContent>
          <CreateAccountForm />
        </CardContent>
      </Card>
    </View>
  );
}
