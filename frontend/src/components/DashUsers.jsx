import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const DashUsers = () => {
  const { currentuser } = useSelector((state) => state.user)
  const [users, setusers] = useState([])
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const fetch_users = async () => {
      try {
        setloading(true)
        const token = localStorage.getItem("access_token");
        const res = await fetch('https://mern-blog-doqn.onrender.com/api/user/getusers',{
            method: 'GET',
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          })
        const data = await res.json()

        if (res.ok) {
          setusers(data.users)
          console.log(data)
          setloading(false)
        }
      } catch (error) {
        console.log(error)
        setloading(false)
      }
    }

    if (currentuser && currentuser.isadmin) {
      fetch_users()
    }
  }, [currentuser._id])

  const delete_user = async (userid) => {
    console.log(userid)

    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`https://mern-blog-doqn.onrender.com/api/user/deleteuser/${userid}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      if (res.ok) {
        setusers((prev) => prev.filter(user => user._id !== userid))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-full  sm:w-10/12 m-3 mx-2">
      {currentuser.isadmin && (users.length > 0 || loading) ? (
        <div className="overflow-x-auto border-2 border-gray-300 rounded-lg shadow-lg">
          <div className="max-h-screen overflow-y-auto">
            <table className="w-full bg-white table-auto">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-200 border-b-2 border-gray-300">
                  <th className="text-left p-3 pl-5">Date Created</th>
                  <th className="text-left p-3">Profile Image</th>
                  <th className="text-left p-3">Username</th>
                  <th className="text-left p-3">Email</th>
                  <th className="text-left p-3">Admin</th>
                  <th className="text-left p-3">Delete</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="p-3 pl-5">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="p-3">
                      <img src={user.profilePicture}  className="h-12 w-15 object-cover" />
                    </td>
                    <td className="p-3 max-w-sm truncate">{user.username}</td>
                    <td className="p-3 max-w-sm truncate">{user.email}</td>
                    <td className="p-3 max-w-sm truncate cursor-default">{
                        user.isadmin ?"✔️":"❌"
                      }
                    </td>
                    <td className="p-3">
                      {user.isadmin?
                      <button className="text-red-500 hover:cursor-not-allowed" >Delete</button>
                      :
                      <button className="text-red-500" onClick={() => {
                        delete_user(user._id)
                      }}>Delete</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  )
}

export default DashUsers
