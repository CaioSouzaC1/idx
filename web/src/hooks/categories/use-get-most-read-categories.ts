import { useQuery } from "@tanstack/react-query";

import { ISearchParamsRoot } from "@/interfaces/Api";
import { IGetCategoryMostRead } from "@/interfaces/Reading";
import { getMostReadCategories } from "@/app/api/categories/get-most-read-categories";

export const useGetMostReadcategories = ({
  page,
  per_page,
  day_quantity,
}: ISearchParamsRoot & {
  day_quantity: number;
}) => {
  const { data: categories } = useQuery<IGetCategoryMostRead>({
    queryKey: ["get-most-read-categories", page, per_page, day_quantity],
    queryFn: () => getMostReadCategories({ page, per_page, day_quantity }),
  });

  return { categories };
};
