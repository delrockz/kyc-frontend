import React from 'react'
import { Form, Input, Button, message, Card } from 'antd'
import { login } from '../API/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IReducer } from '../../interfaces/IReducer'
import { loginFailure, loginRequest, loginSuccess } from '../store/actions'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { loading, error } = useSelector((state: IReducer) => state)

  const onFinish = async (values: { email: string; password: string }) => {
    dispatch(loginRequest())
    login(values, (err, responseData) => {
      if (err) {
        dispatch(loginFailure(err))
        return message.error(err)
      }
      dispatch(loginSuccess(responseData.user))
      return message.success('Login successful!')
    })
  }

  return (
    <div className='flex items-center justify-center'>
      <Card title='Login' style={{ width: 300, margin: 'auto', marginTop: 50 }}>
        <Form name='login' onFinish={onFinish}>
          <Form.Item name='email' rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input placeholder='Email' type='email' />
          </Form.Item>
          <Form.Item name='password' rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password placeholder='Password' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loading} block>
              Login
            </Button>
          </Form.Item>
          {error && (
            <Form.Item>
              <p className='text-red-500'> {error} </p>
            </Form.Item>
          )}
          <Button type='link' htmlType='submit' onClick={() => navigate('/signup/user')} block>
            Not a user? Create an account
          </Button>
        </Form>
      </Card>
    </div>
  )
}

export default Login
