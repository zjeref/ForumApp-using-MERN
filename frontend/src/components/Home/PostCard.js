import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../middlewares/User-state'
import axios from 'axios'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'

const PostCard = ({ post }) => {
    const {data, dispatch} = useContext(UserContext);
    const [currentPost, setCurrentPost] = useState(post);

    const updateVotes = async (action) => {
        const userId = data.signed_user._id
        if (post) {
            switch (action) {
                case "upvote": {
                    console.log(userId, currentPost._id)
                    axios.put(`${process.env.REACT_APP_API_URL}/post/${currentPost._id}/upvote`, {userId})
                        .then((res) => setCurrentPost(res.data))
                        .catch(err => console.log(err))
                    break;
                }
                case "downvote": {
                    axios.put(`${process.env.REACT_APP_API_URL}/post/${currentPost._id}/downvote`, {userId})
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
        <div className="post-card flex w-full">
            <div className="flex flex-col justify-center items-center mr-2 text-6xl select-none">
                <div className=" cursor-pointer hover:text-slate-400 -m-4" onClick={() => updateVotes("upvote")}>
                    <MdArrowDropUp />
                </div>
                <p className="text-xl">{currentPost.votes}</p>
                <div className="cursor-pointer hover:text-slate-400 -m-4" onClick={() => updateVotes("downvote")}>
                    <MdArrowDropDown />
                </div>
            </div>
            <div className="flex space-x-3 bg-slate-700 rounded-xl w-full pr-4 my-3">
                <div className="flex ">
                    <img src="https://source.unsplash.com/random" alt="" className='w-40 rounded-l-xl' />
                </div>
                <div className="flex flex-col justify-between py-2 w-full">
                    <div className="space-y-3 mb-2">
                        <h3 className='text-2xl'>{currentPost.title}</h3>
                        <div className='space-x-2'>
                            {currentPost.tags.map((tag) => {
                                return <span className='tag'>{tag}</span>
                            })}
                        </div>
                    </div>
                    <div className='flex items-center justify-between mt-2'>
                        <div className='flex space-x-2 items-center'>
                            <div>
                                <img src="https://source.unsplash.com/random" alt="" className='w-10 h-10 rounded-full' />
                            </div>
                            <div>
                                <p>{currentPost.author.username}</p>
                                <p>{currentPost.createdAt.slice(0, 10)}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2 items-end">
                            <p>{currentPost.comments.length} Comments</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard
