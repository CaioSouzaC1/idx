import { ISearchParamsRoot } from "@/interfaces/Api";
import { IGetBooks } from "@/interfaces/Book";
import Toast from "react-native-toast-message";
import api from "~/services/api";

export async function getBooks({
  page,
  per_page,
  search,
  category_id,
}: ISearchParamsRoot & {
  category_id?: string;
}) {
  try {
    const response = await api.get<IGetBooks>("/book", {
      params: {
        page,
        per_page,
        search,
        category_id,
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
