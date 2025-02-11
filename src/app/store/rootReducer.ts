import initialState from './initialState'
import { IReducer } from '../../interfaces/IReducer'
import IAction from '../../interfaces/IAction'
import { actions } from './actions/constants'
import { IUser } from '../../interfaces/IUser'

const rootReducer = (state: IReducer = initialState, action: IAction) => {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return {
        ...state,
        user: null,
        loading: true,
        error: null
      }
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null
      }
    case actions.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload
      }
    case actions.LOGOUT:
      return {
        ...state,
        user: {} as IUser,
        loading: false,
        error: null
      }
    default:
      return state
  }
}

export default rootReducer
