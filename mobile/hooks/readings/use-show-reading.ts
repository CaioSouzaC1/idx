import { useQuery } from "@tanstack/react-query";

import { IShowReading } from "~/interfaces/Reading";
import { showReading } from "~/app/api/readings/show-reading";

export const useShowReading = ({ book_id }: { book_id: string }) => {
  const { data: reading } = useQuery<IShowReading>({
    queryKey: ["show-reading", book_id],
    queryFn: () => showReading({ book_id }),
  });

  return { reading };
};
