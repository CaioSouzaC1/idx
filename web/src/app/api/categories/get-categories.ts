import { toast } from "sonner";

import api from "@/app/services/api";
import { ISearchParamsRoot } from "@/interfaces/Api";
import { IGetCategories } from "@/interfaces/Category";

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

    if (error.response.data.message) toast.error(error.response.data.message);
    throw new Error(error.response?.data.message || "Error fetching data");
  }
}
