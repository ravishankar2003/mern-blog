import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import {Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';

const CommentSection = ({ postid }) => {
    const { currentuser } = useSelector((state) => state.user);
    const [comment, setComment] = useState('');
    const [commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getComments = async () => {
          try {
            const res = await fetch(`https://mern-blog-doqn.onrender.com/api/comment/getcomments/${postid}`);
            if (res.ok) {
              const data = await res.json();
              setComments(data);
              console.log(data)
            }
          } catch (error) {
            console.log(error.message);
          }
        };
        getComments();
      }, [postid]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (comment.trim() === '') {
            setCommentError('Comment cannot be empty');
            return;
        }else if(comment.length > 200) return

        try{
        const token = localStorage.getItem('access_token')
        const res = await fetch('https://mern-blog-doqn.onrender.com/api/comment/create',{
            method: 'POST',
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },body: JSON.stringify({
                comment: comment,
                postid,
                userid: currentuser._id,
              }),
        });

        const data = await res.json()
        if (res.ok) {
            setComment('');
            setCommentError(null);
            setComments([data, ...comments]);
          }
    } catch (error) {
            console.log(error.message)
            setCommentError(error.message)
    }
    };
    const handleDeleteComment = (deletedCommentId) => {
        setComments(comments.filter((comment) => comment._id !== deletedCommentId));
    };
    const handleLike = async (commentId) => {
        try {
          if (!currentuser) {
            navigate('/mern-blog/sign-in');
            return;
          }
          const token = localStorage.getItem("access_token")
          const res = await fetch(`https://mern-blog-doqn.onrender.com/api/comment/likecomment/${commentId}`, {
            method: 'PUT',
            credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
          });
          if (res.ok) {
            const data = await res.json();
            setComments(
              comments.map((comment) =>
                comment._id === commentId
                  ? {
                      ...comment,
                      likes: data.likes,
                      nooflikes: data.likes.length,
                    }
                  : comment
              )
            );
          }
        } catch (error) {
          console.log(error.message);
        }
      };

    return (
        <div className='max-w-2xl mx-auto w-full p-3 gap-3'>
            {currentuser ? (
                <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
                    <p>Signed in as:</p>
                    <img
                        className='h-5 w-5 object-cover rounded-full'
                        src={currentuser.profilePicture}
                        alt='Profile'
                    />
                    <Link
                        to={'/mern-blog/dashboard?tab=profile'}
                        className='text-xs text-cyan-600 hover:underline'
                    >
                        @{currentuser.username}
                    </Link>
                </div>
            ) : (
                <div className='text-sm text-teal-500 my-5 flex gap-1'>
                    You must be signed in to comment.
                    <Link className='text-blue-500 hover:underline' to={'/mern-blog/sign-in'}>
                        Sign In
                    </Link>
                </div>
            )}

            {currentuser && (
                <form
                    className='border border-teal-500 rounded-md p-3 mb-2'
                    onSubmit={handleSubmit}
                >
                    <textarea
                        placeholder='Add a comment...'
                        rows='3'
                        maxLength='200'
                        onChange={(e) => setComment(e.target.value)}
                        value={comment}
                        className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500'
                    />
                    <div className='flex justify-between items-center mt-5'>
                        <p className='text-gray-500 text-xs'>
                            {200 - comment.length} characters remaining
                        </p>
                        <button
                            type='submit'
                            className='px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-600 text-white  rounded-md hover:bg-gradient-to-r hover:from-teal-400 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-teal-500'
                        >
                            Submit
                        </button>
                    </div>
                    

                    {commentError && (
                        <div className='mt-5 text-red-500'>
                            {commentError}
                        </div>
                    )}
                </form>
            )}
            <div className='mx-auto mb-5 mt-5 text-gray-700 text-md items-center' > 
            Comments 
            <span > - {comments.length}</span>
            </div>
            {comments && 
            comments.map((comm) => (
                        <Comment key={comm._id} com={comm} onDeleteComment={handleDeleteComment} onLike={handleLike}/>
            ))}
      
      
      
      
      </div>
  )
}

export default CommentSection