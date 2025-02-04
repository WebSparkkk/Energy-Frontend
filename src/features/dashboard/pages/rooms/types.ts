export enum ROOM_STATUSES {
  AVAILABLE = "AVAILABLE", 
  NOT_AVAILABLE = "NOT_AVAILABLE"
}


export type TRoomStatus = `${ROOM_STATUSES}`

export interface IRoom {
  id: string,
  name: string,
  capacity: number,
  status: TRoomStatus,
  hourlyRate: string,
  created_at: string,
  updated_at: string
}

export interface IRoomPayload {
  name: string,
  status: TRoomStatus,
  hourlyRate: number,
  capacity: number
}