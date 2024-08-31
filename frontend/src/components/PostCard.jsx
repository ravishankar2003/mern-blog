import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  // Set a maximum length for the title
  const maxTitleLength = 60; // Adjust this value based on your design
  const truncatedTitle =
    post.title.length > maxTitleLength
      ? post.title.substring(0, maxTitleLength) + '...'
      : post.title;

  return (
    <div className='group relative border border-teal-400 hover:border-teal-600 hover:border-2 overflow-hidden rounded-md sm:w-[350px]  transition-all m-2 p-2 shadow-md'>
      <Link to={`/mern-blog/post/${post.slug}`}>
        <img
          src={post.image}
          alt='post cover'
          className='sm:h-[200px] w-full h-auto object-cover group-hover:opacity-90 transition-opacity duration-300 z-20'
        />
      </Link>
      <div className='p-4 flex flex-col gap-3'>
        <p className='text-md font-medium line-clamp-2 sm:pb-10 p-0 mx-auto'>
          {truncatedTitle}
        </p>
        <Link
  to={`/mern-blog/post/${post.slug}`}
  className='hidden sm:block z-10 group-hover:bottom-0 absolute bottom-[-180px] left-0 right-0 border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-white transition-all duration-300 text-center py-2 rounded-md m-2'
>
  Read Post
</Link>

      </div>
    </div>
  );
};

export default PostCard;
