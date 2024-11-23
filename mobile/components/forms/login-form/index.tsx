import React, { useState } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, LoginFormType } from "@/interfaces/User/schema";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import login from "~/app/api/auth/login";
import { Button } from "@/components/ui/button";
import { Text } from "~/components/ui/text";
import { Link, useRouter } from "expo-router";
import FormInput from "../../ui/forms/form-input";

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
      setIsSubmiting(false);
      router.push("/home");
    },
    async onError(data) {
      setIsSubmiting(false);
      Toast.show({
        type: "error",
        text1: data.message,
      });
    },
  });

  async function onSubmit(data: LoginFormType) {
    setIsSubmiting(true);
    await loginFn(data);
  }

  return (
    <View className="gap-4">
      <FormInput
        label="Email"
        name="email"
        placeholder="email@exemplo.com"
        setValue={setValue}
        errorMessage={form.formState.errors.email?.message}
      />
      <FormInput
        label="Senha"
        name="password"
        placeholder="********"
        type="password"
        setValue={setValue}
        errorMessage={form.formState.errors.password?.message}
      />
      <Button
        isLoading={isSubmiting}
        onPress={handleSubmit(onSubmit)}
        variant="outline">
        <Text>Logar</Text>
      </Button>
      <View className="flex items-end">
        <Link href={"/create-account"}>
          <Text className="text-foreground font-medium underline">
            Criar conta agora
          </Text>
        </Link>
      </View>
    </View>
  );
}
