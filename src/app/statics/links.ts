const host = import.meta.env.VITE_KYC_BACKEND_API_ENDPOINT || ''

export const links = {
  signup: `${host}/api/signup`,
  login: `${host}/api/login`,
  submitKyc: `${host}/api/submitKyc`,
  approveKyc: `${host}/api/approveKyc`,
  rejectKyc: `${host}/api/rejectKyc`,
  kycapplications: `${host}/api/kycapplications`,
  kycdashboard: `${host}/api/kycdashboard`
}
