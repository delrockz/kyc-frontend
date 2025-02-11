import { IUser } from './IUser'

export enum KycStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected'
}

export interface IKycApplication {
  _id: string
  firstName: string
  lastName: string
  phone: string
  idDocumentUrl: string
  user: IUser
  status: KycStatus
}
