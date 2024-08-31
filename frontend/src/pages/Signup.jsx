import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupfailure, signoutSuccess } from '../reduxslice/user/userSlice.js';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const [formdata, setformdata] = useState({
    username: '',
    email: '',
    password: ''
  });
  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value.trim() });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!formdata.username || !formdata.email || !formdata.password) {
      dispatch(signupfailure('Please fill out all fields.'));
      return;
    }
    
    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formdata)
      });

      const data = await res.json();
      
      if (res.ok) {
        navigate('/sign-in')
      } else {
        dispatch(signupfailure(data.message || 'Sign up failed.'));
      }
    } catch (error) {
      dispatch(signupfailure(error.message || 'Network error.'));
    }
  };

  return (
    <div className='pt-14 min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <div className='self-center whitespace-nowrap text-4xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white'>
              Just a
            </span>
            Blog
          </div>
          <p className='text-xl mt-5 font-bold'>Sign Up</p>
        </div>

        <div>
          <form className="w-2xl mx-auto mt-8 p-6 rounded-lg flex-col items-center font-semibold" onSubmit={handlesubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="mb-1">Username</label>
              <input
                type="text"
                id="username"
                value={formdata.username}
                onChange={handlechange}
                className="w-full p-2 border border-gray-300 bg-gray-50 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={formdata.email}
                onChange={handlechange}
                className="w-full p-2 border border-gray-300 bg-gray-50 rounded-md"
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
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            {errorMessage && (
              <div className='mt-4 text-red-500'>
                {errorMessage}
              </div>
            )}
          </form>
          <div className='flex gap-2 text-sm mt-2 px-6'>
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
