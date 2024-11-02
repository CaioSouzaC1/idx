import { toast } from "sonner";

import api from "@/app/services/api";
import { IApiRoot } from "@/interfaces/Api";

export async function deleteBook({ id }: { id: string }) {
  try {
    const response = await api.delete<IApiRoot>(`/book/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching data:",
      error.response?.data || error.message || error
    );

    if (error.response.data.message) toast.error(error.response.data.message);
    throw new Error(error.response?.data.message || "Error fetching data");
  }
}
