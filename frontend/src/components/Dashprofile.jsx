import React, {useState, useRef} from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signinsuccess, signoutSuccess } from '../reduxslice/user/userSlice'

const Dashprofile = () => {
    const {currentuser, ...rest} = useSelector((state)=> state.user)
    const navigate = useNavigate()
    const hidref = useRef()
    const dispatch=useDispatch()
    const [msg,setmsg] = useState(null);
    const [err, seterr] = useState(null);
    const [loading, setloading] = useState(false)
    const [formdata, setformdata] = useState({
        profilePicture: currentuser.profilePicture,
        username: currentuser.username,
        email: currentuser.email,
        password: ''
      });
    
      const handlechange = (e) => {
        setloading(true)
        setformdata({ ...formdata, [e.target.id]: e.target.value});
        setloading(false)
      };

      const handleImageUpload = (event) => {
        setloading(true)
        const file = event.target.files[0];
        const reader = new FileReader();
        if(reader.result === formdata.profilePicture) return ;
        reader.onloadend = () => {
            setformdata({ ...formdata, profilePicture: reader.result });
        };
        reader.readAsDataURL(file);
        setloading(false)
      };

      const handleSubmit = async (event) => {
        event.preventDefault();
        seterr(null)
        setmsg(null)

        if(formdata.profilePicture === currentuser.profilePicture && 
          formdata.username === currentuser.username && 
          formdata.email === currentuser.email && 
          formdata.password === '') 
          {
            seterr('no field is updated');
            return 
          }
          else if(formdata.password === '')
          {
            seterr('enter password');
            return 
          }
      

      
        try {
          const token = localStorage.getItem("access_token");
          const res = await fetch('https://mern-blog-doqn.onrender.com/api/user/updateprofile', {
            method: 'POST',
            credentials: 'include',
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formdata),
          });
      
          const data = await res.json();
          if (!res.ok) {
            const errorMessage = data.message;
            seterr(errorMessage);
            setmsg(null)
          } else {
            dispatch(signinsuccess(data));
            setmsg('Profile updated successfully.');
            seterr(null)
          }
        } catch (error) {
          seterr('An error occurred while updating profile.');
          setmsg(null)
        }
      };

      const handledeleteaccount = async (event) => {
        event.preventDefault();
        seterr(null)
        setmsg(null)
        try {
          const res = await fetch('https://mern-blog-doqn.onrender.com/api/user/deleteprofile', {
            method: 'DELETE',
            credentials: 'include',
            body: formdata,
          });
      
          const data = await res.json();
          if (!res.ok) {
            const errorMessage = data.message;
            seterr(errorMessage);
            setmsg(null)
          } else {
            setmsg('Account deleted successfully.');
            seterr(null)
            dispatch(signoutSuccess())
            navigate('/mern-blog/sign-up')
          
          }
        } catch (error) {
          seterr('An error occurred while updating profile.');
          setmsg(null)
        }
      };
      
    
  return (
    <div className='flex flex-col space-y-2 m-4 mx-auto'>
        <span className='my-4 mx-auto font-semibold text-3xl'> 
            Profile
        </span>
        <form className='flex flex-col space-y-2' onSubmit={handleSubmit}>
            <input type="file" accept='image/*' onChange={handleImageUpload}  ref={hidref} className='hidden'/>
                {formdata.profilePicture && (
                    <img src={formdata.profilePicture} alt="Profile" onClick={() => hidref.current.click()} className="max-w-32 mx-auto 
                    h-auto rounded-full border-4 border-gray-300 bg-grey shadow-lg" />
                )}
            
            <div className="mb-4">
              <label htmlFor="username" className="mb-1">Username</label>
              <input
                type="text"
                id="username"
                value={formdata.username}
                onChange={handlechange}
                className="w-full p-2 border border-gray-300 bg-gray-50 rounded-md shadow-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={formdata.email}
                readOnly
                className="w-full p-2 border border-gray-300 bg-gray-50 rounded-md shadow-md cursor-not-allowed"
              />
            </div>
            <div >
              <label htmlFor="password" className="mb-1">Password</label>
              <input
                type="password"
                id="password"
                placeholder='Password'
                value={formdata.password}
                onChange={handlechange}
                className="w-full p-2 border border-gray-300 bg-gray-50 rounded-md shadow-md"
              />
            </div>
            <button
              type="submit"
              className=" shadow-md  w-full bg-gradient-to-t from-teal-500 to-blue-600 text-white py-2 px-4 
              rounded-md hover:bg-gradient-to-b hover:from-teal-500 hover:to-blue-600" 
              disabled={loading}
            >
            Update Details
            </button>
            {currentuser.isadmin && 
            <Link to='/mern-blog/createpost'>
            <button 
              className=" shadow-md  w-full border-[2px] border-teal-600 hover:border-none hover:mt-1 hover:text-white py-2 px-4 
                rounded-md hover:bg-gradient-to-b hover:from-teal-500 hover:to-blue-600"
              >
              Create Post
            </button>
            </Link>}
            <Link onClick={handledeleteaccount}
               className='hover:text-red-600 hover:font-semibold text-md mx-auto text-red-500' >
                Delete Account
            </Link>

            {msg && (
              <div className='m-4 mx-auto border-2 p-2 rounded-lg border-green-200 shadow-lg bg-green-100 text-sm'>
                {msg}
              </div>
            )}

            {err && (
              <div className='m-4 mx-auto border-2 p-2 rounded-lg border-red-200 shadow-lg bg-red-100 text-sm'>
                {err}
              </div>
            )}

            

        </form>
  </div>
  )
}

export default Dashprofile