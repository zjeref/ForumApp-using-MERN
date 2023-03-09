import React from 'react'
import { useNavigate} from 'react-router-dom'
import { FaImage, FaLink } from 'react-icons/fa'



const CreatePost = () => {
    const navigate = useNavigate();
    const switchPage=() => {
        navigate('/create');
    }

    return (
        
        <div className="flex space-x-3 items-center w-full bg-slate-700 px-4 py-2 rounded-md mb-5" onClick={switchPage}>
            
            <div className=" p-2">
                <img src="" alt="" className='w-14 h-12 rounded-full' />
            </div>
            <div className='w-full text-black px-2 '>
                <input className='w-full text-xl rounded-lg' type="text" placeholder='Create Post' />
            </div>
            <div className='flex space-x-2 text-3xl'>
                <div className='p-2 hover:bg-slate-800 active:bg-slate-900 rounded-md cursor-pointer'>
                    <FaImage />
                </div>
                <div className='p-2 hover:bg-slate-800 active:bg-slate-900 rounded-md cursor-pointer'>
                    <FaLink />
                </div>
            </div>
        </div>
    )
}

export default CreatePost
