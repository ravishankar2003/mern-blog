import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
  });

  console.log(sidebarData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    if (searchTermFromUrl || sortFromUrl) {
      setSidebarData({
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`https://mern-blog-doqn.onrender.com/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    console.log(urlParams)
    const searchQuery = urlParams.toString();
    navigate(`/mern-blog/search?${searchQuery}`);
  };

  return (
    <div className='pt-14 flex flex-col md:flex-row'>
      <div className='p-4 border-b md:border-r md:min-h-screen border-gray-300 md:w-72 '>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex gap-2 flex-col'>
            <label htmlFor='searchTerm' className='whitespace-nowrap font-semibold '>
              Search Term:
            </label>
            <input
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
              placeholder='Search...'
              className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent'
            />
          </div>
          <div className='flex items-center gap-2'>
  <label htmlFor='sort' className='font-semibold'>Sort:</label>
  <select
    id='sort'
    value={sidebarData.sort}
    onChange={handleChange}
    className='px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent mr-3 bg-white text-gray-700'
  >
    <option value='desc'>Latest</option>
    <option value='asc'>Oldest</option>
  </select>
</div>

          <button
            type="submit"
            className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-md  hover:from-teal-400 hover:to-blue-400"
            >
            Apply Filters
        </button>

        </form>
      </div>


      
      <div className='w-full'>
        <h1 className='text-xl font-semibold sm:border-b border-gray-300 shadow-sm p-3 mt-1 pl-9'>
          Posts results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}
          {!loading &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </div>
  );
}
