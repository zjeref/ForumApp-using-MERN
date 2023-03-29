import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../middlewares/User-state'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md'
import { formatTimeSinceCreation } from '../../middlewares/User-state'

import Comment from './Comment'
import Loading from '../loading'

const PostCard = ({ id }) => {

    const { data } = useContext(UserContext);
    const [currentPost, setCurrentPost] = useState(null);
    const [commentData, setCommentData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`${process.env.REACT_APP_API_URL}/post/${id}`)
                .then(res => {
                    setCurrentPost(res.data)
                })
                .catch(err => console.error(err))
        }
        fetchData();
    }, [id])

    const updateVotes = async (action) => {
        const author = data.signed_user._id

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

    const submitComment = async (e) => {

        if (e.keyCode === 13) {

            await axios.put(`${process.env.REACT_APP_API_URL}/post/update/comment`, { author: data.signed_user._id, postId: id, content: commentData })
                .then(res => setCurrentPost(res.data))
                .catch(err => console.log(err))
            setCommentData('')
        }
    }



    return (

        <div className="post-card flex w-full">
            <div className="flex flex-col items-center mr-2 text-5xl select-none">
                <div className=" cursor-pointer hover:text-slate-400 -m-4" onClick={() => updateVotes("upvote")}>
                    <MdArrowDropUp />
                </div>
                <p className="text-lg">{currentPost?.votes}</p>
                <div className="cursor-pointer hover:text-slate-400 -m-4" onClick={() => updateVotes("downvote")}>
                    <MdArrowDropDown />
                </div>
            </div>
            <div className="flex flex-col space-x-3 bg-white dark:bg-slate-700  w-full px-4 shadow-lg">
                {currentPost ?
                    <div className="flex flex-col justify-between py-2 w-full">
                        <div className=" mb-2">
                            <div className='flex space-x-2 items-center mb-2'>
                                <div>
                                    <Link to={`/user/${currentPost.author._id}`}>
                                        <img src={currentPost.author?.avatar} alt="" className='w-8 h-8 rounded-full' />
                                    </Link>
                                </div>
                                <div className="hover:underline hover:text-blue-400">
                                    <Link to={`/user/${currentPost.author._id}`}>
                                        <p className="text-lg">{currentPost.author.username}</p>
                                    </Link>
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm">{formatTimeSinceCreation(currentPost.createdAt)}</p>
                                </div>
                            </div>
                            <h3 className='text-xl font-semibold'>{currentPost.title}</h3>
                            <p className="text-sm break-all">{currentPost.description}</p>
                            <div className='space-x-2'>
                                {currentPost.tags?.map((tag) => {
                                    if (tag === "") {
                                        return
                                    }
                                    return <span key={tag} className='tag'>{tag}</span>
                                })}
                            </div>
                        </div>
                        <div className="flex justify-center ">
                            <img src={currentPost.image} alt="" className='h-full max-h-screen' />
                        </div>
                        <div className='flex items-center justify-between my-2 border-b-2 '>
                            <div className="flex space-x-2 items-end">
                                <p>{currentPost.comments.length} Comments</p>
                            </div>
                        </div>
                        {data.isLoggedIn ?
                            <div className="my-2 text-black">
                                <input className='w-full' type="text" placeholder='What are your thoughts?' value={commentData} onChange={(e) => setCommentData(e.target.value)} onKeyDown={(e) => submitComment(e)} />
                            </div> :
                            <Link to='/login'>
                                <div className='w-max py-1 px-2 rounded-lg space-x-3 text-lg bg-white'>
                                    <input className='form-input focus:ring-0 border-none text-black' type="text" placeholder='Log in or sign up to leave a comment' />
                                    <button className='bg-transparent dark:text-black border-2 border-slate-500 px-4 rounded-full'>Log in</button>
                                    <button className='bg-transparent text-black border-2 border-slate-500 px-4 rounded-full'>Sign up</button>
                                </div>
                            </Link>
                        }
                        {currentPost.comments?.map((comment) => {
                            return <Comment key={comment._id} comment={comment} />
                        })}
                    </div>
                    :
                    <Loading />
                }
            </div>
        </div>
    )
}

export default PostCard
