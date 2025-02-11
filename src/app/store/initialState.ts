import { IUser } from '../../interfaces/IUser'

const initialState = {
  user: {} as IUser,
  loading: false,
  error: null,
  accessToken: null
}

export default initialState
