import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard.jsx';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`https://mern-blog-doqn.onrender.com/api/post/getposts?limit=${6}`);
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="mt-16 border-1 sm:max-w-6xl mx-auto  relative bg-gradient-to-r from-teal-500 to-blue-600 text-white overflow-hidden rounded-lg shadow-lg">
        <div className="relative p-8 sm:p-12 lg:p-28 px-3 max-w-6xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold lg:text-7xl drop-shadow-lg animate-fade-in">
            Welcome to My Blog
          </h1>
          <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mt-4">
            Discover in-depth articles and tutorials on web development, Generative AI,
            programming languages, and more. Dive into the world of technology with us!
          </p>
          <div className="mt-6">
            <Link
              to="/search"
              className="px-6 py-3 bg-teal-600 text-white font-bold text-sm sm:text-base rounded-lg shadow-lg hover:bg-teal-700 transition duration-300"
            >
              Explore All Posts
            </Link>
          </div>
        </div>
      </div>


      {/* Recent Posts Section */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}

        {!posts.length && (
          <div className="animate-pulse flex justify-center space-x-4">
            <div className="h-40 w-60 bg-gray-200 rounded-lg"></div>
            <div className="h-40 w-60 bg-gray-200 rounded-lg"></div>
            <div className="h-40 w-60 bg-gray-200 rounded-lg"></div>
          </div>
        )}
      </div>
      
    </div>
  );
}
