import { View } from "react-native";
import { Text } from "../text";
import { TextInput } from "../text-input";
import { UseFormSetValue } from "react-hook-form";

export default function FormInput({
  label,
  name,
  placeholder = "",
  setValue,
  errorMessage,
}: {
  label: string;
  name: string;
  placeholder?: string;
  setValue: UseFormSetValue<any>;
  errorMessage?: string;
}) {
  return (
    <View className="gap-2">
      <Text>{label}</Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={(text) => setValue(name, text)}
        style={{ borderBottomWidth: 1, marginBottom: 4 }}
      />
      {errorMessage && (
        <Text className="text-destructive text-xs">{errorMessage}</Text>
      )}
    </View>
  );
}
