import React from 'react'
import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions'
import { IReducer } from '../../interfaces/IReducer'
import KycApplicationDetails from '../components/KycApplicationDetails'
import SubmitKycForm from '../components/SubmitKycForm'

const UserDashboard: React.FC = () => {
  const dispatch = useDispatch()
  const kycApplication = useSelector((state: IReducer) => state.kycApplication)

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center bg-white p-4 shadow-md'>
        <h2 className='text-xl font-semibold text-black'>KYC Application</h2>
        <Button onClick={() => dispatch(logout())} type='primary' icon={<LogoutOutlined />}>
          Logout
        </Button>
      </div>

      <div className='flex justify-center gap-4 my-6'>
        {kycApplication?._id ? <KycApplicationDetails kycApplication={kycApplication} /> : <SubmitKycForm />}
      </div>
    </div>
  )
}

export default UserDashboard
