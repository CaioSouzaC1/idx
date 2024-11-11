import { useQuery } from "@tanstack/react-query";

import { ISearchParamsRoot } from "@/interfaces/Api";
import { IGetBooks } from "@/interfaces/Book";
import { getBooks } from "@/app/api/books/get-books";

export const useGetBooks = ({
  page,
  per_page,
  search,
  category_id,
}: ISearchParamsRoot & {
  category_id?: string;
}) => {
  const { data: books } = useQuery<IGetBooks>({
    queryKey: ["get-books", page, per_page, search, category_id],
    queryFn: () => getBooks({ page, per_page, search, category_id }),
  });

  return { books };
};
