import React from "react";
import { Text, TextInput, View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, LoginFormType } from "@/interfaces/User/schema";
import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { IUserLogin } from "@/interfaces/User";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import login from "@/app/api/auth/login";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  const { setValue, formState, handleSubmit } = form;

  const { mutateAsync: createCategoryFn } = useMutation({
    mutationFn: login,
    mutationKey: ["user-login"],
    async onSuccess(data) {
      await SecureStore.setItemAsync("token", data.data.token);
      await SecureStore.setItemAsync("user", JSON.stringify(data.data.user));
      Toast.show({
        type: "success",
        text1: data.message,
        text2: "🙋🏻‍♂️",
      });
    },
  });

  async function onSubmit(data: LoginFormType) {
    await createCategoryFn(data);
  }

  return (
    <View>
      <Text>E-mail:</Text>
      <TextInput
        placeholder="Digite seu e-mail"
        onChangeText={(text) => setValue("email", text)}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      {formState.errors.email && (
        <Text style={{ color: "red" }}>{formState.errors.email.message}</Text>
      )}

      <Text>Senha:</Text>
      <TextInput
        placeholder="Digite sua senha"
        secureTextEntry
        onChangeText={(text) => setValue("password", text)}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      {formState.errors.password && (
        <Text style={{ color: "red" }}>
          {formState.errors.password.message}
        </Text>
      )}

      <Button variant="destructive">
        <Text>Default</Text>
      </Button>

      <Button onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
