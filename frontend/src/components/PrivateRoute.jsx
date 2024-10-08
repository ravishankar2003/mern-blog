import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoute = () => {
    const {currentuser} = useSelector((state) => state.user)
  return (currentuser)? <Outlet/> : <Navigate to = '/mern-blog/sign-in'/>
}

export default PrivateRoute