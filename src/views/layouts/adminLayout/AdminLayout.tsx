import UserContext from 'context/user/UserContext'
import { useContext } from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  const { dbUser } = useContext(UserContext)
  return (
    dbUser.role === 'admin' ? (
      <Outlet />
    ) : (
      <>loading</>
    )
  )
}

export default AdminLayout;