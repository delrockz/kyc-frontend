import React, { useState, useEffect } from 'react'
import { Button, Table, Card, Modal, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { approveKyc, getKycDashboard, getKycApplications, rejectKyc } from '../API/KYC'
import { IKycApplication, KycStatus } from '../../interfaces/IKycDocument'
import LogoutButton from '../components/LogoutButton'

const AdminDashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    nUsers: 0,
    nPending: 0,
    nApproved: 0,
    nRejected: 0
  })
  const [kycApplications, setkycApplications] = useState<IKycApplication[]>([])
  const [idDocumentImageModal, setIdDocumentImageModal] = useState({ visible: false, url: '' })

  useEffect(() => {
    handleGetKycDashboard()
    handleGetKycApplications()
  }, [])

  const handleGetKycDashboard = async () => {
    getKycDashboard((err, responseData) => {
      if (err) return message.error(err)
      setDashboardData(responseData)
    })
  }

  const handleGetKycApplications = async () => {
    getKycApplications((err, responseData) => {
      if (err) return message.error(err)
      setkycApplications(responseData)
    })
  }

  const handleApproveKyc = async (kycId: string) => {
    approveKyc(kycId, (err, responseData) => {
      if (err) return message.error(err)
      setkycApplications((prev: IKycApplication[]) =>
        prev.map((kycApplication: IKycApplication) =>
          kycApplication._id === kycId ? ({ ...kycApplication, status: 'approved' } as IKycApplication) : kycApplication
        )
      )
      setDashboardData((prev) => ({ ...prev, nApproved: prev.nApproved + 1, nPending: prev.nPending - 1 }))
      return message.success(responseData)
    })
  }

  const handleRejectKyc = async (kycId: string) => {
    rejectKyc(kycId, (err, responseData) => {
      if (err) return message.error(err)
      setkycApplications((prev: IKycApplication[]) =>
        prev.map((kycApplication: IKycApplication) =>
          kycApplication._id === kycId ? ({ ...kycApplication, status: 'rejected' } as IKycApplication) : kycApplication
        )
      )
      setDashboardData((prev) => ({ ...prev, nRejected: prev.nRejected + 1, nPending: prev.nPending - 1 }))
      return message.success(responseData)
    })
  }

  const columns: ColumnsType<IKycApplication> = [
    {
      title: 'Email',
      dataIndex: 'email',
      render: (_, record) => record.user?.email
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'User ID Document',
      dataIndex: 'idDocumentUrl',
      key: 'idDocumentUrl',
      render: (url: string) => (
        <Button type='link' onClick={() => setIdDocumentImageModal({ visible: true, url })}>
          View ID Document
        </Button>
      )
    },
    {
      title: 'Action/Status',
      key: 'action',
      render: (_, record) =>
        record.status === 'pending' ? (
          <div className='flex gap-2'>
            <Button type='primary' onClick={() => handleApproveKyc(record._id)}>
              Approve KYC
            </Button>
            <Button danger onClick={() => handleRejectKyc(record._id)}>
              Reject KYC
            </Button>
          </div>
        ) : (
          <div>
            {(record.status as KycStatus) === KycStatus.pending ? (
              <span className='text-blue-500'>Pending</span>
            ) : (record.status as KycStatus) === KycStatus.approved ? (
              <span className='text-green-500'>Approved</span>
            ) : (record.status as KycStatus) === KycStatus.rejected ? (
              <span className='text-red-500'>Rejected</span>
            ) : (
              ''
            )}
          </div>
        )
    }
  ]
  return (
    <div className='p-4'>
      <div className='flex justify-between items-center bg-white p-4 shadow-md'>
        <h2 className='text-md md:text-xl font-semibold text-black'>KYC Application</h2>
        <h2 className='text-md md:text-xl font-semibold text-black'>Admin Dashboard</h2>
        <LogoutButton />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 my-6'>
        <Card className='text-center shadow-md' style={{ backgroundColor: '#76A9FA' }}>
          <h3 className='text-md md:text-lg font-medium'>Total Users</h3>
          <p className='text-lg md:text-2xl font-semibold'>{dashboardData.nUsers}</p>
        </Card>
        <Card className='text-center shadow-md' style={{ backgroundColor: '#FCE96A' }}>
          <h3 className='text-md md:text-lg font-medium'>Pending KYC</h3>
          <p className='text-lg md:text-2xl font-semibold'>{dashboardData.nPending}</p>
        </Card>
        <Card className='text-center shadow-md' style={{ backgroundColor: '#31C48D' }}>
          <h3 className='text-md md:text-lg font-medium'>Approved KYC</h3>
          <p className='text-lg md:text-2xl font-semibold'>{dashboardData.nApproved}</p>
        </Card>
        <Card className='text-center shadow-md' style={{ backgroundColor: '#F98080' }}>
          <h3 className='text-md md:text-lg font-medium'>Rejected KYC</h3>
          <p className='text-lg md:text-2xl font-semibold'>{dashboardData.nRejected}</p>
        </Card>
      </div>

      <Table scroll={{ x: 'max-content' }} columns={columns} dataSource={kycApplications} rowKey='email' />

      <Modal
        open={idDocumentImageModal.visible}
        footer={null}
        onCancel={() => setIdDocumentImageModal({ visible: false, url: '' })}
      >
        <img src={idDocumentImageModal.url} alt='User ID Document' className='w-full' />
      </Modal>
    </div>
  )
}

export default AdminDashboard
