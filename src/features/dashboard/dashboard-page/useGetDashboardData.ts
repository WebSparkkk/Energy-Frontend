import { useQuery } from "react-query";
import { IDashboardInfos } from "./types";
import { AxiosError } from "axios";
import { getDashboardInfosService } from "./services";

export function useGetDashboardData () {
  return useQuery<TResponse<IDashboardInfos>,AxiosError<unknown>>({
    queryFn:getDashboardInfosService,
    queryKey:["dashboard_infos"],
    retry: 0
  })
}