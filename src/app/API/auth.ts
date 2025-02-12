import axios from 'axios'
import { links } from '../statics/links'

export const signUp = async (
  data: { email: string; password: string; userType: string },
  callback: (err: any, response: any) => void
) => {
  try {
    await axios.post(links.signup, data)
    return callback(null, 'Sign Up successful!')
  } catch (error: any) {
    return callback(error.response?.data?.error || 'Something went wrong, please try again later.', null)
  }
}

export const login = async (
  credentials: { email: string; password: string },
  callback: (err: any, response: any) => void
) => {
  try {
    const response = await axios.post(links.login, credentials)
    return callback(null, response.data.data)
  } catch (error: any) {
    return callback(error.response?.data?.error || 'Something went wrong, please try again later.', null)
  }
}
