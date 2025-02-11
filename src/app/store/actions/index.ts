import { IKycApplication } from '../../../interfaces/IKycDocument'
import { IUser } from '../../../interfaces/IUser'
import { actions } from './constants'

export const loginRequest = () => {
  return {
    type: actions.LOGIN_REQUEST
  }
}
export const loginSuccess = ({
  user,
  accessToken,
  kycApplication
}: {
  user: IUser
  accessToken: string
  kycApplication: IKycApplication
}) => {
  return {
    type: actions.LOGIN_SUCCESS,
    payload: { user, accessToken, kycApplication }
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
export const submitKycApplication = (kycApplication: IKycApplication) => {
  return {
    type: actions.SUBMIT_KYC_APPLICATION,
    payload: kycApplication
  }
}
