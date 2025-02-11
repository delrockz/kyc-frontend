import { IUser } from './IUser'

export interface IReducer {
  user: IUser
  loading: boolean
  error: string | null
}
