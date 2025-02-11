import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Spin } from 'antd'
import { useSelector } from 'react-redux'
import { IReducer } from './interfaces/IReducer'

const SignUp = lazy(() => import('./app/Pages/SignUp'))
const Login = lazy(() => import('./app/Pages/Login'))
const UserDashboard = lazy(() => import('./app/Pages/UserDashboard'))
const AdminDashboard = lazy(() => import('./app/Pages/AdminDashboard'))

const App = () => {
  const user = useSelector((state: IReducer) => state.user)

  return (
    <div className='App'>
      <Suspense fallback={<Spin className='my-2' />}>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route
            element={
              user?.email ? (
                <Navigate to={user.userType === 'Admin' ? '/admindashboard' : '/userdashboard'} />
              ) : (
                <SignUp isAdminSide={false} />
              )
            }
            path={'/signup/user'}
          />
          <Route
            element={
              user?.email ? (
                <Navigate to={user.userType === 'Admin' ? '/admindashboard' : '/userdashboard'} />
              ) : (
                <SignUp isAdminSide={true} />
              )
            }
            path={'/signup/admin'}
          />
          <Route
            element={
              user?.email ? (
                <Navigate to={user.userType === 'Admin' ? '/admindashboard' : '/userdashboard'} />
              ) : (
                <Login />
              )
            }
            path={'/login'}
          />
          <Route
            element={
              !user?.email ? (
                <Navigate to='/login' />
              ) : user?.userType === 'User' ? (
                <UserDashboard />
              ) : (
                <Navigate to='/admindashboard' />
              )
            }
            path={'/userdashboard'}
          />
          <Route
            element={
              !user?.email ? (
                <Navigate to='/login' />
              ) : user?.userType === 'Admin' ? (
                <AdminDashboard />
              ) : (
                <Navigate to='/userdashboard' />
              )
            }
            path={'/admindashboard'}
          />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
