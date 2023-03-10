import React from 'react'
import { formatTimeSinceCreation } from '../../middlewares/User-state'

const Comment = ({ comment }) => {
    return (
        <div className='flex space-x-3 w-full bg-slate-700 p-2 border-b-2'>
            <div className='mt-2 w-10 flex flex-shrink-0'>
                <img src="https://source.unsplash.com/random" alt="" className='w-12 h-10 rounded-full' />
            </div>
            <div>
                <div className='flex space-x-4'>
                    <p className='text-xl'>{comment.author.username}</p>
                    <p className='text-slate-400'>{formatTimeSinceCreation(comment.createdAt)}</p>
                </div>
                <p>{comment.content}</p>
            </div>
        </div>
    )
}

export default Comment
