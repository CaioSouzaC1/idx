import { IApiRoot } from "@/interfaces/Api";
import Toast from "react-native-toast-message";
import { LoginFormType } from "~/interfaces/User/schema";
import api from "~/services/api";

export default async function login(data: LoginFormType) {
  try {
    const response = await api.post<IApiRoot>("/auth/login", data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching data:",
      error.response?.data || error.message || error
    );

    if (error.response.data.message)
      Toast.show({
        type: "error",
        text1: error.response.data.message,
      });
    throw new Error(error.response?.data.message || "Error fetching data");
  }
}
