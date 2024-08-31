import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Dashpposts = () => {
  const { currentuser } = useSelector((state) => state.user)
  const [posts, setposts] = useState([])
  const [loading, setloading] = useState(false)

  useEffect(() => {
    const fetch_posts = async () => {
      try {
        setloading(true)
        const res = await fetch(`https://mern-blog-doqn.onrender.com/api/post/getposts?userId=${currentuser._id}`)
        const data = await res.json()

        if (res.ok) {
          setposts(data.posts)
          setloading(false)
        }
      } catch (error) {
        console.log(error)
        setloading(false)
      }
    }

    if (currentuser && currentuser.isadmin) {
      fetch_posts()
    }
  }, [currentuser._id])

  const delete_post = async (postid) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`https://mern-blog-doqn.onrender.com/api/post/delete/${postid}/${currentuser._id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      })
      if (res.ok) {
        setposts((prev) => prev.filter(post => post._id !== postid))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-full  sm:w-10/12 m-3 mx-2">
      {currentuser.isadmin && (posts.length > 0 || loading) ? (
        <div className="overflow-x-auto border-2 border-gray-300 rounded-lg shadow-lg">
          <div className="max-h-screen overflow-y-auto">
            <table className="w-full bg-white table-auto">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-200 border-b-2 border-gray-300">
                  <th className="text-left p-3 pl-5">Date Updated</th>
                  <th className="text-left p-3">Post Image</th>
                  <th className="text-left p-3">Post Title</th>
                  <th className="text-left p-3">Delete</th>
                  <th className="text-left p-3">Edit</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="p-3 pl-5">
                      <Link to={`/post/${post.slug}`} className="block w-full h-full">
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </Link>
                    </td>
                    <td className="p-3">
                      <Link to={`/post/${post.slug}`} className="block w-full h-full">
                        <img src={post.image} alt={post.title} className="h-12 w-15 object-cover" />
                      </Link>
                    </td>
                    <td className="p-3 max-w-sm truncate">
                      <Link to={`/post/${post.slug}`} className="block w-full h-full">
                        {post.title}
                      </Link>
                    </td>
                    <td className="p-3">
                      <button className="text-red-500" onClick={(e) => {
                        e.stopPropagation(); // Prevents the row click event
                        delete_post(post._id)
                      }}>Delete</button>
                    </td>
                    <td className="p-3">
                      <Link to={`/updatepost/${post._id}`} className="text-blue-500">Edit</Link>
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

export default Dashpposts
