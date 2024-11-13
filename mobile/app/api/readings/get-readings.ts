import { ISearchParamsRoot } from "@/interfaces/Api";
import Toast from "react-native-toast-message";
import { IGetReadings } from "~/interfaces/Reading";
import api from "~/services/api";

export async function getReadings({
  page,
  per_page,
  search,
}: ISearchParamsRoot) {
  try {
    const response = await api.get<IGetReadings>("/read", {
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
