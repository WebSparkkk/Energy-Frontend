import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { IBarItem } from "../types";
import { AxiosError } from "axios";
import { getOrderItemsService } from "../services";

export function useGetOrderItems () {
  const [searchParams] = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const query = searchParams.get("search") || ""

  return useQuery<TResponse<IBarItem[]>,AxiosError<unknown>>({
    queryFn: () => getOrderItemsService({ page, query }),
    queryKey: ["order_items", page, query],
    retry: false
  })
}