import { toast } from "sonner";

import api from "@/app/services/api";
import { ISearchParamsRoot } from "@/interfaces/Api";
import { IGetCategoryMostRead } from "@/interfaces/Reading";

export async function getMostReadCategories({
  page,
  per_page,
  day_quantity,
}: ISearchParamsRoot & {
  day_quantity: number;
}) {
  try {
    const response = await api.get<IGetCategoryMostRead>(
      "/category/most-read",
      {
        params: {
          page,
          per_page,
          day_quantity,
        },
      }
    );
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
