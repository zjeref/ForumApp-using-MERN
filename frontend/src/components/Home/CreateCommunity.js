import React from 'react'
import { Link } from 'react-router-dom'

const CreateCommunity = () => {
    return (
        <div className="w-full bg-slate-700 p-4 rounded-md ">
            <div className='border-b-2 border-white pb-4'>
                <div className='my-1'>
                    <h1 className='text-2xl'>Home</h1>
                </div>
                <div className='my-1'>
                    <p className='text-lg'>Your personal Forum fronpage. Come here to check in with your favorite communities.</p>
                </div>
            </div>
            <div className='flex flex-col space-y-3 mt-5'>
                <Link to='/create'>
                    <button className="w-full sideBtn bg-white text-black hover:bg-slate-200">Create Post</button>
                </Link>

                <Link>
                    <button className="w-full sideBtn hover:bg-slate-800">Create Community</button>
                </Link>
            </div>
        </div>
    )
}

export default CreateCommunity
