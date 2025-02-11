import React, { useState } from 'react'
import { Form, Input, Button, message, Card } from 'antd'
import { signUp } from '../API/auth'
import { useNavigate } from 'react-router-dom'

interface SignUpProps {
  isAdminSide: boolean
}

const SignUp: React.FC<SignUpProps> = ({ isAdminSide }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSignUp = async (data: { email: string; password: string }) => {
    setLoading(true)
    signUp({ ...data, userType: isAdminSide ? 'Admin' : 'User' }, (err, responseData) => {
      setLoading(false)
      if (err) {
        setError(err)
        return message.error(err)
      }
      setError(null)
      message.success(responseData)
      return navigate('/login')
    })
  }

  return (
    <Card title='Sign Up' style={{ width: 300, margin: 'auto', marginTop: 50 }}>
      <Form name='signup' onFinish={handleSignUp}>
        <Form.Item name='email' rules={[{ required: true, message: 'Please enter your email' }]}>
          <Input placeholder='Email' type='email' />
        </Form.Item>
        <Form.Item name='password' rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password placeholder='Password' />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={loading} block>
            Sign Up
          </Button>
        </Form.Item>
        {error && (
          <Form.Item>
            <p className='text-red-500'> {error} </p>
          </Form.Item>
        )}
        <Button type='link' htmlType='submit' onClick={() => navigate('/login')} block>
          Already have an account? Login here
        </Button>
      </Form>
    </Card>
  )
}

export default SignUp
