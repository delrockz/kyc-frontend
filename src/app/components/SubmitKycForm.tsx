import React, { useState } from 'react'
import { Form, Input, Button, message, Card, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { submitKyc } from '../API/KYC'

const SubmitKycForm: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onFinish = async (values: { firstName: string; lastName: string; phone: string; image: any }) => {
    setLoading(true)
    const formData = new FormData()

    formData.append('firstName', values.firstName)
    formData.append('lastName', values.lastName)
    formData.append('phone', values.phone)

    if (values.image[0]?.originFileObj) formData.append('idDocumentImage', values.image[0].originFileObj)

    submitKyc(formData, (err, responseData) => {
      setLoading(false)
      if (err) {
        setError(err)
        return message.error(err)
      }
      setError(null)
      return message.success(responseData)
    })
  }

  return (
    <Card title='KYC details' style={{ width: 400, margin: 'auto', marginTop: 50 }}>
      <Form name='submitKYC' onFinish={onFinish}>
        <Form.Item name='firstName' rules={[{ required: true, message: 'Please enter your first name' }]}>
          <Input placeholder='First Name' />
        </Form.Item>
        <Form.Item name='lastName' rules={[{ required: true, message: 'Please enter your last name' }]}>
          <Input placeholder='Last Name' />
        </Form.Item>
        <Form.Item name='phone' rules={[{ required: true, message: 'Please enter your phone number' }]}>
          <Input placeholder='Phone' type='tel' />
        </Form.Item>
        <Form.Item
          name='image'
          valuePropName='fileList'
          getValueFromEvent={(e) => e.fileList}
          rules={[{ required: true, message: 'Please upload your ID Document image' }]}
        >
          <Upload accept='image/*' maxCount={1} beforeUpload={() => false}>
            <Button icon={<UploadOutlined />}>Upload ID Document Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading} block>
            Submit KYC details
          </Button>
        </Form.Item>
        {error && (
          <Form.Item>
            <p className='text-red-500'> {error} </p>
          </Form.Item>
        )}
      </Form>
    </Card>
  )
}

export default SubmitKycForm
