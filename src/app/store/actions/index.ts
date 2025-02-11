import { IUser } from '../../../interfaces/IUser'
import { actions } from './constants'

export const loginRequest = () => {
  return {
    type: actions.LOGIN_REQUEST
  }
}
export const loginSuccess = (user: IUser) => {
  return {
    type: actions.LOGIN_SUCCESS,
    payload: user
  }
}
export const loginFailure = (error: string) => {
  return {
    type: actions.LOGIN_FAILURE,
    payload: error
  }
}
export const logout = () => {
  return {
    type: actions.LOGOUT
  }
}
