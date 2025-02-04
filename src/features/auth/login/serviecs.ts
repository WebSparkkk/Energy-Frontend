import { authService } from "@/core/lib/services";
import { ILoginPayload, ILoginResponse } from "./types";

export async function loginService (payload: ILoginPayload): Promise<TResponse<ILoginResponse>> {
  const res = await authService.post("/admin-users/login",payload)
  return res.data
}