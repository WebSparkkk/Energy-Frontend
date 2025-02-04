import { useQuery } from "react-query";
import { getTreasuryInfoService } from "../services";
import { ITreasuryInfo } from "../types";
import { AxiosError } from "axios";

export function useGetTreasuryInfo () {
  return useQuery<TResponse<ITreasuryInfo>,AxiosError<unknown>>({
    queryKey:['treasury'],
    retry:0,
    queryFn: getTreasuryInfoService
  })
}