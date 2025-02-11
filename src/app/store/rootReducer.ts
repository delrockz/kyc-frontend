import initialState from './initialState'
import { IReducer } from '../../interfaces/IReducer'
import IAction from '../../interfaces/IAction'
import { actions } from './actions/constants'
import { IUser } from '../../interfaces/IUser'

const rootReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        kycApplication: action.payload.kycApplication,
        error: null
      }
    case actions.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload,
        accessToken: null,
        kycApplication: null
      }
    case actions.LOGOUT:
      return {
        ...state,
        user: {} as IUser,
        loading: false,
        error: null,
        accessToken: null,
        kycApplication: null
      }
    default:
      return state
  }
}

export default rootReducer
