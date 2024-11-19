import { ISearchParamsRoot } from "@/interfaces/Api";
import { IGetReadings } from "@/interfaces/Reading";
import Toast from "react-native-toast-message";
import api from "~/services/api";

export async function getMostReadBooks({
  page,
  per_page,
  day_quantity,
}: ISearchParamsRoot & {
  day_quantity: number;
}) {
  try {
    const response = await api.get<IGetReadings>("/book/most-read", {
      params: {
        page,
        per_page,
        day_quantity,
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