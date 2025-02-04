import { httpService } from "@/core/lib/services";
import { IMemberPayload } from "./types";

export async function getMembersService ({
  page, 
  query
}:{
  page: number,
  query?: string
}) {
  const res = await httpService.get(`/client?size=8&page=${page}${query ? `&query=${query}` : ""}`)
  return res.data
}


export async function deleteMemberService(userId:string) {
  const res = await httpService.delete(`/client/${userId}`)
  return res.data
}

export async function createMemberService(payload:IMemberPayload) {
  const res = await httpService.post(`/client`, payload)
  return res.data
}

export async function editMemberService({
  memberId,
  member
}:{
  memberId: string,
  member: IMemberPayload
}) {
  const res = await httpService.put(`/client/${memberId}`, member)
  return res.data
}

export async function getMemberService (memberId: string) {
  const res = await httpService.get(`/client/${memberId}`)
  return res.data
}
