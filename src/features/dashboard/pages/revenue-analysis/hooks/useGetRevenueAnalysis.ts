import { useQuery } from "react-query";
import { IRevenueAnalysis, TAnalysisSpecificType, TAnalysisTransactionType } from "../types";
import { AxiosError } from "axios";
import { getRevenueAnalysis } from "../services";
import { useSearchParams } from "react-router-dom";

export function useGetRevenueAnalysis () {

  const [searchParams] = useSearchParams()
  const fromDate = searchParams.get("fromDate") as string
  const toDate = searchParams.get("toDate") as string
  const specificType = searchParams.get("specificType") as TAnalysisSpecificType
  const transactionType = searchParams.get("transactionType") as TAnalysisTransactionType

  return useQuery<TResponse<IRevenueAnalysis>,AxiosError<unknown>>({
    retry: 0,
    queryFn:() => getRevenueAnalysis({ fromDate, specificType, toDate, transactionType }),
    queryKey: ['revenue_analysis', fromDate, specificType, toDate, transactionType],
    enabled: (!!fromDate && !!toDate && !!specificType && !!transactionType),
  })
}