import { useQuery } from "@tanstack/react-query";

import { ISearchParamsRoot } from "@/interfaces/Api";
import { IGetBookMostFinished } from "@/interfaces/Reading";
import { getMostFinishedBooks } from "@/app/api/books/get-most-finished-books ";

export const useGetMostFinishedBooks = ({
  page,
  per_page,
  day_quantity,
}: ISearchParamsRoot & {
  day_quantity: number;
}) => {
  const { data: books } = useQuery<IGetBookMostFinished>({
    queryKey: ["get-most-finished-books", page, per_page, day_quantity],
    queryFn: () => getMostFinishedBooks({ page, per_page, day_quantity }),
  });

  return { books };
};
