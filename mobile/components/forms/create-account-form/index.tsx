import React, { useState } from "react";
import { View } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema, RegisterFormType } from "@/interfaces/User/schema";
import { useMutation } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { Button } from "@/components/ui/button";
import { Text } from "~/components/ui/text";
import { useRouter } from "expo-router";
import FormInput from "../../ui/forms/form-input";
import register from "~/app/api/auth/register";

export default function CreateAccountForm() {
  const router = useRouter();

  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(registerFormSchema),
  });

  const { setValue, handleSubmit } = form;

  const { mutateAsync: registerFn } = useMutation({
    mutationFn: register,
    mutationKey: ["user-register"],
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
    async onError() {
      setIsSubmiting(false);
    },
  });

  async function onSubmit(data: RegisterFormType) {
    setIsSubmiting(true);
    await registerFn(data);
  }

  return (
    <View className="gap-4">
      <FormInput
        label="Nome"
        name="name"
        placeholder="Marcos Castro"
        setValue={setValue}
        errorMessage={form.formState.errors.name?.message}
      />
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
        <Text>Criar conta</Text>
      </Button>
    </View>
  );
}
