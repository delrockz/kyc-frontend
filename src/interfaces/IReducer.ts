import { Reducer } from 'redux'
import { IUser } from './IUser'
import { IKycApplication } from './IKycDocument'

export interface IReducer extends Reducer {
  user: IUser | null
  loading: boolean
  error: string | null
  accessToken: string | null
  kycApplication: IKycApplication | null
}
