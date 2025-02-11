import { useDispatch } from 'react-redux'
import { logout } from '../store/actions'
import { LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const LogoutButton = () => {
  const dispatch = useDispatch()

  return (
    <Button onClick={() => dispatch(logout())} type='primary' icon={<LogoutOutlined />}>
      Logout
    </Button>
  )
}

export default LogoutButton
