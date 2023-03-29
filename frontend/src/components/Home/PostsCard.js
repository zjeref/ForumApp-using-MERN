import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../middlewares/User-state'
import axios from 'axios'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import { formatTimeSinceCreation } from '../../middlewares/User-state'

const PostsCard = ({ post }) => {
    const navigate = useNavigate();
    const { data } = useContext(UserContext);
    const [currentPost, setCurrentPost] = useState(post);

    const updateVotes = async (action) => {
        const author = data.signed_user._id
        if (post) {
            switch (action) {
                case "upvote": {
                    axios.put(`${process.env.REACT_APP_API_URL}/post/${currentPost._id}/upvote`, { author })
                        .then((res) => setCurrentPost(res.data))
                        .catch(err => console.log(err))
                    break;
                }
                case "downvote": {
                    axios.put(`${process.env.REACT_APP_API_URL}/post/${currentPost._id}/downvote`, { author })
                        .then((res) => setCurrentPost(res.data))
                        .catch(err => console.log(err))
                    break;
                }
                default: {
                    return
                }
            }
        }
    }


    return (
        <div className="post-card flex w-full dark:text-white">
            <div className="flex flex-col justify-center items-center mr-2 text-5xl select-none">
                <div className=" cursor-pointer hover:text-primary dark:hover:text-slate-400 -m-4" onClick={() => updateVotes("upvote")}>
                    <MdArrowDropUp />
                </div>
                <p className="text-lg">{currentPost?.votes}</p>
                <div className="cursor-pointer hover:text-primary dark:hover:text-slate-400 -m-4" onClick={() => updateVotes("downvote")}>
                    <MdArrowDropDown />
                </div>
            </div>
            <div className="flex flex-col md:flex-row space-x-3 shadow-lg bg-white dark:bg-slate-700 rounded-xl w-full pr-4 my-3 cursor-pointer" onClick={() => navigate(`/post/${currentPost?._id}`)}>
                <div className="flex justify-center">
                    {currentPost.image && <img src={currentPost.image} alt="" className='w-40 md:rounded-l-xl md:border-r-2' />}
                </div>
                <div className="flex flex-col justify-between py-2 w-full">
                    <div className="mb-2">
                        <h3 className='text-lg font-semibold line-clamp-2'>{currentPost?.title}</h3>
                        <div className='space-x-2'>
                            {currentPost.tags?.map((tag) => {
                                return <span key={tag} className='tag'>{tag}</span>
                            })}
                        </div>
                    </div>
                    <div className='flex items-end justify-between mt-2'>
                        <div className='flex space-x-2 items-center'>
                            <div>
                                <img src={currentPost.author?.avatar} alt="" className='w-8 h-8 rounded-full' />
                            </div>
                            <div>
                                <p className=''>{currentPost.author?.username}</p>
                                <p className='text-slate-600 dark:text-slate-400 text-sm'>{formatTimeSinceCreation(currentPost?.createdAt)}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2 items-end text-sm">
                            <p>{currentPost.comments?.length} Comments</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostsCard
