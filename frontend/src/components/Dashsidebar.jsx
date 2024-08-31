import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { signoutSuccess } from '../reduxslice/user/userSlice';
import { Link } from 'react-router-dom';

const Dashsidebar = () => {
    const {currentuser, ...rest} = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handlesignout = async () => {
        try {
          const token = localStorage.getItem("access_token");
          const res = await fetch('http://localhost:3000/api/user/signout', {
            method: 'POST',
            'Authorization': `Bearer ${token}`,
            credentials: 'include'
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            localStorage.removeItem('access_token');
            dispatch(signoutSuccess()); 
          }
        } catch (error) {
          console.log(error.message);
        }
        
      };
  return (
<div className=" p-7   sm:p-2 sm:border-r border-gray-300 md:w-52 flex flex-col bg-stone-100 gap-1">
    <div
        className=" rounded-md block px-3 py-2 text-md text-gray-700 bg-gray-200"
    >
        {currentuser.username && (
            <Link to='/settings?tab=profile' className='text-md font-semibold flex items-center justify-between'>
            <span className='overflow-hidden text-ellipsis whitespace-nowrap'>
              {currentuser.username.length > 7 ? `${currentuser.username.substring(0, 7)}...` : currentuser.username}
            </span>
            <span className='text-sm text-white font-normal rounded-md px-1.5 bg-gray-500 ml-2'>
              {currentuser.isadmin ? "Admin" : "User"}
            </span>
          </Link>
        )}
    </div> 
    {currentuser.isadmin && 
    <Link to='/settings?tab=posts' className="hover:shadow-md  rounded-md block font-semibold px-4 py-2 mt-1 text-md text-gray-700 bg-gray-200 
        hover:bg-gray-300 hover:border-2 hover:border-gray-400 transition-colors duration-200 w-full text-center">
      Posts
    </Link>}
    {currentuser.isadmin && 
    <Link to='/settings?tab=users' className="hover:shadow-md  rounded-md block font-semibold px-4 py-2 mt-1 text-md text-gray-700 bg-gray-200 
        hover:bg-gray-300 hover:border-2 hover:border-gray-400 transition-colors duration-200 w-full text-center">
      Users
    </Link>}
    <button 
        onClick={handlesignout} 
        className="hover:shadow-md  rounded-md block font-semibold px-4 py-2 mt-1 text-md text-gray-700 bg-gray-200 
        hover:bg-gray-300 hover:border-2 hover:border-gray-400 transition-colors duration-200 w-full text-center"
    >
        Sign out
    </button>
</div>
  )
}

export default Dashsidebar