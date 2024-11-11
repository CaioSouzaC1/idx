import { ISearchParamsRoot } from "@/interfaces/Api";
import { IGetCategories } from "@/interfaces/Category";
import Toast from "react-native-toast-message";
import api from "~/services/api";

export async function getCategories({
  page,
  per_page,
  search,
}: ISearchParamsRoot) {
  try {
    const response = await api.get<IGetCategories>("/category", {
      params: {
        page,
        per_page,
        search,
      },
    });
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
