import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, LoginFormType } from "@/interfaces/User/schema";
import api from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { IUserLogin } from "@/interfaces/User";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import login from "~/app/api/auth/login";
import { Button } from "@/components/ui/button";
import { Text } from "~/components/ui/text";
import { TextInput } from "~/components/ui/text-input";
import { Link, useRouter } from "expo-router";

export default function LoginForm() {
  const router = useRouter();

  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginFormSchema),
  });

  const { setValue, formState, handleSubmit } = form;

  const { mutateAsync: loginFn } = useMutation({
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
      router.push("/home");
    },
    async onError() {
      setIsSubmiting(false);
    },
  });

  async function onSubmit(data: LoginFormType) {
    setIsSubmiting(true);
    await loginFn(data);
  }

  return (
    <View className="gap-4">
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
      </View>
      <View>
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
      </View>
      <Button
        disabled={isSubmiting}
        onPress={handleSubmit(onSubmit)}
        variant="outline">
        <Text>Logar</Text>
      </Button>
      <View className="flex items-end">
        <Link href={"/home"}>
          <Button className="!px-0" variant="link">
            <Text>Criar conta agora</Text>
          </Button>
        </Link>
      </View>
    </View>
  );
}
