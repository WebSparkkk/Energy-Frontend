export interface ISupplier {
  id: string,
  name: string,
  responsibleName: string,
  phone: string,
  email: string,
  niche: string,
  address: string,
  balance: string,
  createdAt: string,
  updatedAt: string
}

export interface ISupplierPayload {
  name: string,
  responsibleName: string,
  phone: string,
  email: string,
  niche: string,
  address: string
}