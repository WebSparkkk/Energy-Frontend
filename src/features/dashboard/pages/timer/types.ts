export enum TIMER_STATUSES {
  ACTIVE =    "ACTIVE",
  PAUSED =    "PAUSED",
  ENDED =     "ENDED"
}

export enum TIMER_PAYMENT_STATUSES {
  PENDING =   "PENDING",
  PAID =      "PAID",
};

export enum TIMER_PAYMENT_METHODS {
  CASH = 'cash',
  VISA = 'visa'
}
export type TTimerStatus = `${TIMER_STATUSES}`
export type TTimerPaymentStatus = `${TIMER_PAYMENT_STATUSES}`
export type TTimerPaymentMethod = `${TIMER_PAYMENT_METHODS}`

export interface ITimer {
  id:               string,
  clientId:         string,
  hourlyRate:       string,
  timerStatus:      TTimerStatus,
  paymentStatus:    TTimerPaymentStatus,
  startTime:        string,
  pauseTime:        string,
  totalActiveTime:  number,
  totalPrice:       string,
  createdAt:        string,
  updatedAt:        string,
  Client: {
    id: string,
    name: string
  }
}

export interface ITimerPaymentInfo {
  totalActiveTime: number,
  totalPrice: string
}


export interface IPayTimerPayload {
  paymentMethod: TTimerPaymentMethod
}

export interface ITimerPayload {
  clientId: string, 
  hourlyRate: number
}
