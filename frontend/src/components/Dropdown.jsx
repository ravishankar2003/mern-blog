import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../reduxslice/user/userSlice';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentuser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handlesignout = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch('https://mern-blog-doqn.onrender.com/api/user/signout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
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

    toggleDropdown();
  };

  return (
    <div className="relative inline-block text-left z-10">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={toggleDropdown}
        >
          <img src={currentuser.profilePicture} alt="profile" className="w-7 h-7 rounded-full bg-grey shadow-lg" />
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <span className="block px-4 py-2 text-sm text-gray-700 font-mono overflow-hidden whitespace-nowrap">
              {currentuser.email}
            </span>
            {/* Additional links for small screens */}
            <div className="md:hidden ">
              <Link to='/search' onClick={toggleDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Posts
              </Link>
              <Link to='/'onClick={toggleDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Home
              </Link>
              <Link to='/about' onClick={toggleDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                About
              </Link>
            </div>
            <Link to='/settings?tab=profile' onClick={toggleDropdown} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Profile
            </Link>
            <button onClick={handlesignout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
              Sign out
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
