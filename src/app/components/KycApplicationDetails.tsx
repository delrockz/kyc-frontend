import React, { useState } from 'react'
import { IKycApplication } from '../../interfaces/IKycDocument'
import { KycStatus } from '../../interfaces/IKycDocument'
import { Modal } from 'antd'

const KycApplicationDetails = ({ kycApplication }: { kycApplication: IKycApplication }) => {
  const [idDocumentImageModal, setIdDocumentImageModal] = useState(false)

  return (
    <div className='flex flex-col items-center justify-center p-4'>
      <h2 className='text-2xl font-bold text-blue-500'>KYC Details Submitted!</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-lg'>
        <div className='flex flex-col'>
          <strong>First Name:</strong>
          <span>{kycApplication.firstName}</span>
        </div>
        <div className='flex flex-col'>
          <strong>Last Name:</strong>
          <span>{kycApplication.lastName}</span>
        </div>

        <div className='flex flex-col'>
          <strong>Email:</strong>
          <span>{kycApplication.user?.email}</span>
        </div>
        <div className='flex flex-col'>
          <strong>Phone:</strong>
          <span>{kycApplication.phone}</span>
        </div>
        <div className='flex flex-col'>
          <strong>ID Document Image:</strong>
          <span className='text-blue-500 cursor-pointer' onClick={() => setIdDocumentImageModal(true)}>
            View
          </span>
        </div>
        <div className='flex flex-col'>
          <strong>Status:</strong>
          {(kycApplication.status as KycStatus) === KycStatus.pending ? (
            <span className='text-blue-500'>Pending</span>
          ) : (kycApplication.status as KycStatus) === KycStatus.approved ? (
            <span className='text-green-500'>Approved</span>
          ) : (kycApplication.status as KycStatus) === KycStatus.rejected ? (
            <span className='text-red-500'>Rejected</span>
          ) : (
            ''
          )}
        </div>
      </div>

      <Modal open={idDocumentImageModal} footer={null} onCancel={() => setIdDocumentImageModal(false)}>
        <img src={kycApplication.idDocumentUrl} alt='ID Document' className='w-full' />
      </Modal>
    </div>
  )
}

export default KycApplicationDetails
