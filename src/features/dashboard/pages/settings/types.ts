export interface IResetPasswordPayload {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
}


export interface IUserProfilePayload {
  username: string,
  email: string,
}