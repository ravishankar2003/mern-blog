import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';

const Comment = ({ com, onDeleteComment, onLike }) => {
    const { currentuser } = useSelector((state) => state.user);
    const [userdata, setUserData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(com.comment);
    const [isDeleted, setIsDeleted] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/user/getuser/${com.userid}`);
                const data = await res.json();
                if (res.ok) {
                    setUserData(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, [com.userid]);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const res = await fetch(`http://localhost:3000/api/comment/editcomment/${com._id}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment: editedContent }),
            });

            const data = await res.json();

            if (res.ok) {
                setIsEditing(false);
                setEditedContent(data.comment); // Ensure `data.comment` is updated
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleEdit = () => {
        setEditedContent(com.comment);
        setIsEditing(true);
    };

    const onDelete = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const res = await fetch(`http://localhost:3000/api/comment/deletecomment/${com._id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (res.ok) {
                onDeleteComment(com._id); 
                setIsDeleted(true);
            } else {
                const data = await res.json();
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className={`flex flex-row mb-4 p-3 bg-white dark:bg-gray-800 shadow-sm rounded-lg gap-3 ${isDeleted ? 'hidden' : ''}`}>
            <div>
                {userdata ? (
                    <img 
                        src={userdata.profilePicture || ''} 
                        alt={userdata.username || 'User'} 
                        className='rounded-full h-8 w-8 object-cover mt-1' 
                    />
                ) : (
                    <div className='rounded-full h-8 w-8 bg-gray-300 dark:bg-gray-600 mt-1 animate-pulse' />
                )}
            </div>
            <div className='w-full flex flex-col'>
                <div className='text-black dark:text-white font-semibold text-sm mb-2 flex items-center'> 
                    {userdata ? (
                        <>
                            @{userdata.username}
                            <span className='ml-4 font-sans font-normal text-xs text-gray-500 dark:text-gray-400'>
                                ...{moment(com.createdAt).fromNow()}
                            </span>
                        </>
                    ) : (
                        'Loading...'
                    )}
                </div>
                {isEditing ? (
                    <>
                        <textarea
                            className='w-full mb-2 p-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-700'
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                        />
                        <div className='flex justify-end gap-2 text-xs'>
                            <button
                                type='button'
                                className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600'
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                type='button'
                                className='px-3 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-100 dark:hover:bg-gray-600'
                                onClick={() => { setEditedContent(com.comment); setIsEditing(false)}}
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <p className='text-gray-600 dark:text-gray-300 pb-2'>{com.comment}</p>
                        <div className='flex items-center pt-2 text-xs border-t dark:border-gray-700 gap-2'>
                            <button
                                type='button'
                                onClick={() => onLike(com._id)}
                                className={`text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 ${
                                    currentuser &&
                                    com.likes.includes(currentuser._id) &&
                                    '!text-blue-500 '
                                }`}
                            >
                                <FaThumbsUp className='text-sm' />
                            </button>
                            <p className='text-gray-400 dark:text-gray-500'>
                                {com.nooflikes > 0 &&
                                    com.nooflikes +
                                        ' ' +
                                        (com.nooflikes === 1 ? 'like' : 'likes')}
                            </p>
                            {currentuser &&
                                (currentuser._id === com.userid || currentuser.isadmin) && (
                                    <>
                                        <button
                                            type='button'
                                            onClick={handleEdit}
                                            className='text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400'
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type='button'
                                            onClick={onDelete}
                                            className='text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400'
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Comment;
