import { httpService } from "@/core/lib/services"

export async function getLogsService({
  page,
  query
}:{
  page: number,
  query: string
}) {
  const res = await httpService.get(`/history?size=8&page=${page}${query ? `&query=${query}` : ""}`)
  return res.data
}

export async function deleteLogService(logId: string) {
  const res = await httpService.delete(`/history/${logId}`)
  return res.data
}