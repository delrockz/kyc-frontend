import React from 'react'
import { useSelector } from 'react-redux'
import { IReducer } from '../../interfaces/IReducer'
import KycApplicationDetails from '../components/KycApplicationDetails'
import SubmitKycForm from '../components/SubmitKycForm'
import LogoutButton from '../components/LogoutButton'

const UserDashboard: React.FC = () => {
  const kycApplication = useSelector((state: IReducer) => state.kycApplication)

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center bg-white p-4 shadow-md'>
        <h2 className='text-md md:text-xl font-semibold text-black'>KYC Application</h2>
        <LogoutButton />
      </div>

      <div className='flex justify-center gap-4 my-6'>
        {kycApplication?._id ? <KycApplicationDetails kycApplication={kycApplication} /> : <SubmitKycForm />}
      </div>
    </div>
  )
}

export default UserDashboard
