import React, {useContext} from 'react'
import { UserContext } from '../middlewares/User-state'
import { FaSearch } from 'react-icons/fa'

const Navbar = () => {
    const {data} = useContext(UserContext)
    

    return (
        <div className="flex w-full justify-between py-[2vh] px-[3vw] bg-slate-700 text-white">
            <div className="flex space-x-2">
                <div className="">
                    <img src="https://source.unsplash.com/random" alt="" className='w-10 h-10 rounded-full' />
                </div>
                <div className="text-3xl">
                    <span>Forum</span>
                    <span className="text-green-300">App</span>
                </div>
            </div>
            <div>
                <label className="flex items-center space-x-4 bg-white text-slate-600 px-4 py-1 rounded-lg" htmlFor="search">
                    <FaSearch style={{ fontSize: "1.8rem" }} />
                    <input className='input-form border-none text-xl focus:ring-0' type="text" id='search' placeholder='Search Forum' />
                </label>
            </div>
            <div className="">
                <div className="flex space-x-2">
                    <div className="">
                        <img src="https://source.unsplash.com/random" alt="" className='w-10 h-10 rounded-full' />
                    </div>
                    <div>
                        <h6>{data.signed_user.name}</h6>
                        <h6>{data.signed_user.username}</h6>
                    </div>
                </div>
                {/*To do Drop Down*/}
            </div>
        </div>
    )
}

export default Navbar
