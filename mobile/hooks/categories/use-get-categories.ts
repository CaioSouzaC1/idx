import { useQuery } from "@tanstack/react-query";

import { ISearchParamsRoot } from "@/interfaces/Api";
import { getCategories } from "@/app/api/categories/get-categories";
import { IGetCategories } from "@/interfaces/Category";

export const useGetCategories = ({
  page,
  per_page,
  search,
}: ISearchParamsRoot) => {
  const { data: categories } = useQuery<IGetCategories>({
    queryKey: ["get-categories", page, per_page, search],
    queryFn: () => getCategories({ page, per_page, search }),
  });

  return { categories };
};
