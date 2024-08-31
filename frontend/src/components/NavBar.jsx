import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSearch } from 'react-icons/fa'; // Import search icon
import Dropdown from './Dropdown';

const NavBar = () => {
  const navigate = useNavigate()
  const { currentuser } = useSelector((state) => state.user);
  const [searchTerm, setsearchTerm] = useState('')


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setsearchTerm(searchTermFromUrl);
    }else setsearchTerm('')
  }, [location.search]);

  const handleSubmit = (e)=>{

    e.preventDefault()
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm" , searchTerm)
    const searchQuery = urlParams.toString();
    navigate(`/mern-blog/search?${searchQuery}`);

  }

  return (
    <nav className='h-14 px-4 max-md:px-2 border-b-2 flex items-center justify-between bg-white shadow-sm fixed top-0 left-0 w-full z-50'>
     <Link to='/mern-blog' className='flex items-center space-x-1 text-md sm:text-xl font-semibold text-gray-900 dark:text-white'>
  <span className='px-3 pr-2 py-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg text-white'>
    Blog
  </span>
  <span className=' text-gray-700 dark:text-gray-300'>
  Spot
  </span>
</Link>
      <div className='flex items-center gap-2'>
        <form className='hidden md:flex items-center' onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder='Search...' 
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
            className='border-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white'
          />
          <button type='submit' className='ml-2'>
            <FaSearch className='w-6 h-6 text-gray-600 dark:text-white' />
          </button>
        </form>
      </div>
      <div className='hidden md:flex gap-8 font-semibold text-gray-900 dark:text-white'>
        <Link to='/mern-blog'>Home</Link>
        <Link to='/mern-blog/search'>Posts</Link>
        <Link to='/mern-blog/about'>About</Link>
      </div>
      <div className='flex items-center gap-4'>
        
        {currentuser ? (
          <Dropdown />
        ) : (
          <Link 
            to='/mern-blog/sign-in'
            className='border-2 px-4 py-2 rounded-lg font-semibold text-gray-900 border-gray-900 dark:border-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white'
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
