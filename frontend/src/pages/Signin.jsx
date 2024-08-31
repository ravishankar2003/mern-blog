import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signinstart, signinsuccess, signinfailure } from '../reduxslice/user/userSlice.js';


const Signin = () => {
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [formdata, setformdata] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value.trim() });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!formdata.email || !formdata.password) {
      dispatch(signinfailure('Please fill all the fields'));
      return;
    }
    
    dispatch(signinstart());
    
    try {
      const res = await fetch('https://mern-blog-doqn.onrender.com/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (res.ok) {
        const { access_token , ...rest} = data
        localStorage.setItem("access_token", access_token)
        dispatch(signinsuccess(rest));
        navigate('/mern-blog');
      } else {
        dispatch(signinfailure(data.message || 'Something went wrong'));
      }
    } catch (error) {
      dispatch(signinfailure(error.message || 'Network error'));
    }
  };

  return (
    <div className='pt-14 min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <div className='self-center whitespace-nowrap text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white'>Just a</span>
            Blog
          </div>
          <p className='text-xl mt-5 font-bold'>Sign In</p>
        </div>

        <div>
          <form className="w-2xl mx-auto mt-8 p-6 rounded-lg flex-col items-center font-semibold" onSubmit={handlesubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={formdata.email}
                onChange={handlechange}
                className="w-full p-2 border border-gray-300 bg-gray-50 rounded-md dark:bg-slate-400 dark:border-stone-300"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={formdata.password}
                onChange={handlechange}
                className="w-full p-2 border border-gray-300 bg-gray-50 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white  rounded-md hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-400"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            {errorMessage && (
              <div className='mt-4 text-red-500'>
                {errorMessage}
              </div>
            )}
          </form>
          <div className='flex gap-2 text-sm mt-2 px-6'>
            <span>Don't have an account?</span>
            <Link to='/mern-blog/sign-up' className='text-blue-500'>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
