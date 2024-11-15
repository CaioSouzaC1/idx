import Toast from "react-native-toast-message";
import { IShowReading } from "~/interfaces/Reading";
import api from "~/services/api";

export async function showReading({ book_id }: { book_id: string }) {
  try {
    const response = await api.get<IShowReading>("/read/show", {
      params: {
        book_id,
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
