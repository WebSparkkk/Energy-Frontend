declare type TChildren = {
  readonly children: React.ReactNode
}

declare type TResponse<T> = {
  isSuccessfull: boolean,
  message: string
  data: T,
  error: {
    errorCode: number,
    message: string
  }
}


declare type TArrayResponse<T> = {
  isSuccessfull: boolean,
  message: string
  data: {
    data: T[],
    currentPage: number,
    size: number,
    totalCount: number,
    totalPages: number
  },
  error: {
    errorCode: number,
    message: string
  }
}