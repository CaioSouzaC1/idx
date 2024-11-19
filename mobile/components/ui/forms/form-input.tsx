import { View } from "react-native";
import { Text } from "../text";
import { TextInput } from "../text-input";
import { UseFormSetValue } from "react-hook-form";
import { PasswordInput } from "../password-input";

export default function FormInput({
  label,
  name,
  placeholder = "",
  setValue,
  type,
  errorMessage,
}: {
  label: string;
  name: string;
  placeholder?: string;
  setValue: UseFormSetValue<any>;
  type?: string;
  errorMessage?: string;
}) {
  return (
    <View className="gap-2">
      <Text>{label}</Text>
      {type === "password" ? (
        <PasswordInput
          placeholder={placeholder}
          onChangeText={(text) => setValue(name, text)}
          style={{ borderBottomWidth: 1, marginBottom: 4 }}
        />
      ) : (
        <TextInput
          placeholder={placeholder}
          onChangeText={(text) => setValue(name, text)}
          style={{ borderBottomWidth: 1, marginBottom: 4 }}
        />
      )}

      {errorMessage && (
        <Text className="text-destructive text-xs">{errorMessage}</Text>
      )}
    </View>
  );
}
