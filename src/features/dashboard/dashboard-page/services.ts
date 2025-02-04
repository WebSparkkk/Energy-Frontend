import { httpService } from "@/core/lib/services";

export async function getDashboardInfosService() {
  const res = await httpService.get("/dashboard")
  return res.data
}