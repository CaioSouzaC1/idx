import { useQuery } from "@tanstack/react-query";

import { ISearchParamsRoot } from "@/interfaces/Api";
import { getMostReadBooks } from "@/app/api/books/get-most-read-books";
import { IGetReadings } from "@/interfaces/Reading";

export const useGetMostReadBooks = ({
  page,
  per_page,
  day_quantity,
}: ISearchParamsRoot & {
  day_quantity: number;
}) => {
  const { data: books } = useQuery<IGetReadings>({
    queryKey: ["get-most-read-books", page, per_page, day_quantity],
    queryFn: () => getMostReadBooks({ page, per_page, day_quantity }),
  });

  return { books };
};
