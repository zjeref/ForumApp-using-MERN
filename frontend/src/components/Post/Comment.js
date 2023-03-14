import React from 'react'
import { formatTimeSinceCreation } from '../../middlewares/User-state'

const Comment = ({ comment }) => {
    return (
        <div className='flex space-x-1 w-full bg-slate-700 p-2 border-b-2'>
            <div className='mt-2 w-10 min-w-fit flex'>
                <img src={comment.author.avatar} alt="" className='w-10 h-10 rounded-full' />
            </div>
            <div className='max-w-md bg-slate-800 px-6 py-1 rounded-3xl -space-y-1'>
                <p className='text-lg'>{comment.author.username}</p>
                <span className='break-all'>{comment.content}</span>
            </div>
            <div className='w-2/12 min-w-fit'>
                <p className='text-slate-400'>{formatTimeSinceCreation(comment.createdAt)}</p>
            </div>
        </div>
    )
}

export default Comment
