import axios from 'axios'
import { links } from '../statics/links'
import { store } from '../store/store'

export const submitKyc = async (formData: FormData, callback: (err: any, response: any) => void) => {
  try {
    const response = await axios.post(links.submitKyc, formData, {
      headers: { Authorization: `Bearer ${store.getState()?.accessToken}`, 'Content-Type': 'multipart/form-data' }
    })
    return callback(null, response.data.data)
  } catch (error: any) {
    return callback(error.response?.data?.error || 'Something went wrong, please try again later.', null)
  }
}

export const getKycApplications = async (callback: (err: any, response: any) => void) => {
  try {
    const response = await axios.get(links.kycapplications, {
      headers: { Authorization: `Bearer ${store.getState()?.accessToken}` }
    })
    return callback(null, response.data.data)
  } catch (error: any) {
    return callback(error.response?.data?.error || 'Something went wrong, please try again later.', null)
  }
}

export const approveKyc = async (id: string, callback: (err: any, response: any) => void) => {
  try {
    const response = await axios.put(
      `${links.approveKyc}/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${store.getState()?.accessToken}` }
      }
    )
    return callback(null, response.data.data)
  } catch (error: any) {
    return callback(error.response?.data?.error || 'Something went wrong, please try again later.', null)
  }
}

export const rejectKyc = async (id: string, callback: (err: any, response: any) => void) => {
  try {
    const response = await axios.put(
      `${links.rejectKyc}/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${store.getState()?.accessToken}` }
      }
    )
    return callback(null, response.data.data)
  } catch (error: any) {
    return callback(error.response?.data?.error || 'Something went wrong, please try again later.', null)
  }
}

export const getKycDashboard = async (callback: (err: any, response: any) => void) => {
  try {
    const response = await axios.get(links.kycdashboard, {
      headers: { Authorization: `Bearer ${store.getState()?.accessToken}` }
    })
    return callback(null, response.data.data)
  } catch (error: any) {
    return callback(error.response?.data?.error || 'Something went wrong, please try again later.', null)
  }
}
