import React from 'react'
import { useNavigate} from 'react-router-dom'
import { FaImage, FaLink } from 'react-icons/fa'



const CreatePost = () => {
    const navigate = useNavigate();
    const switchPage=() => {
        navigate('/create');
    }

    return (
        
        <div className="flex space-x-3 items-center w-full bg-white border-2 border-primary dark:bg-slate-700 px-4 py-1 rounded-md mb-5 shadow-lg" onClick={switchPage}>
            
            <div className="w-1/12">
                <img src="https://i.imgur.com/ij4XprK.jpeg" alt="" className='w-10 h-10 rounded-full min-w-fit' />
            </div>
            <div className='w-full text-black px-2 '>
                <input className='w-full rounded-lg' type="text" placeholder='Create Post' />
            </div>
            <div className='flex space-x-2 text-xl '>
                <div className='p-2 text-slate-900 dark:text-white hover:bg-semilight hover:dark:bg-slate-800 rounded-md cursor-pointer'>
                    <FaImage />
                </div>
                <div className='p-2 text-slate-900 dark:text-white hover:bg-semilight hover:dark:bg-slate-800 rounded-md cursor-pointer'>
                    <FaLink />
                </div>
            </div>
        </div>
    )
}

export default CreatePost
