import { AxiosError } from "axios";
import { ITransaction } from "../types";
import { useQuery } from "react-query";
import { getTransactionService } from "../services";

export function useGetTransaction (transactionId: string) {
  return useQuery<TResponse<ITransaction>,AxiosError<unknown>>({
    queryKey:['treasury',"transaction",transactionId],
    retry:0,
    queryFn: () => getTransactionService(transactionId)
  })
}