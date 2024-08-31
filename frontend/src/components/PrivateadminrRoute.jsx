import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const PrivateadminRoute = () => {
    const {currentuser} = useSelector((state) => state.user)
  return (currentuser && currentuser.isadmin)? <Outlet/> : "No access"
}

export default PrivateadminRoute