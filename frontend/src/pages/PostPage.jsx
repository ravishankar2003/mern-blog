import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostPage = () => {
    const { postslug } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [post, setPost] = useState(null);
    const [recentposts, setRecentPosts] = useState([]);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const res = await fetch(`https://mern-blog-doqn.onrender.com/api/post/getposts?limit=4`);
                const data = await res.json();
                if (res.ok) {
                    setRecentPosts(data.posts.filter(post => post.slug !== postslug));
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchRecentPosts();
    }, [postslug]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`https://mern-blog-doqn.onrender.com/api/post/getposts?slug=${postslug}`);
                const data = await res.json();
                if (res.ok) {
                    if (data.posts && data.posts.length > 0) {
                        setPost(data.posts[0]);
                    } else {
                        setError('Post not found');
                    }
                    setLoading(false);
                } else {
                    setError('Failed to fetch post');
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setError('An error occurred');
                setLoading(false);
            }
        };

        fetchPost();
    }, [postslug]);

    if (loading) return <div className="pt-14 flex justify-center items-center h-screen text-lg text-gray-500">Loading...</div>;
    if (error) return <div className="pt-14 flex justify-center items-center h-screen text-lg text-red-500">{error}</div>;

    return (
        <>
            {post ? (
                <div className="pt-14 p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
                    <h1 className="text-2xl mt-5 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl whitespace-normal">
                        {post.title}
                    </h1>
                    <img src={post.image} alt={post.title} className="sm:w-1/2 w-full mb-10 h-52 rounded-lg mx-auto" />
                    <div className='p-3 max-w-2xl mx-auto w-full post-content' 
                        >
                            <ReactQuill
                        value={post.content}
                        readOnly
                        theme="snow"
                        className=" read-only-editor "
                        />
                    </div>
                    
                    <CommentSection postid={post._id} />
                    <div className='mx-auto flex flex-col '>
                        <h1 className='mx-auto font-medium text-xl'>Recent Posts</h1>
                        <div className='flex sm:flex-row flex-col justify-center w-full gap-4 '>
                            {recentposts.length > 0
                                ? recentposts.map(recent => (<PostCard key={recent._id} post={recent} />))
                                : <h2>No recent Posts</h2>}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="pt-14 text-lg text-gray-500">No post available</p>
            )}
        </>
    );
};

export default PostPage;
