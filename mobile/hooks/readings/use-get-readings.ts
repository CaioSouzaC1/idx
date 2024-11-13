import { useQuery } from "@tanstack/react-query";

import { ISearchParamsRoot } from "@/interfaces/Api";
import { getReadings } from "~/app/api/readings/get-readings";
import { IGetReadings } from "~/interfaces/Reading";

export const useGetReadings = ({
  page,
  per_page,
  search,
}: ISearchParamsRoot) => {
  const { data: readings } = useQuery<IGetReadings>({
    queryKey: ["get-readings", page, per_page, search],
    queryFn: () => getReadings({ page, per_page, search }),
  });

  return { readings };
};
