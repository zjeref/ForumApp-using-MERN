import React, { useContext, useState } from 'react'

import { Link } from 'react-router-dom'
import { UserContext } from '../middlewares/User-state'
import { FaSearch } from 'react-icons/fa'
import { MdOutlineArrowDropDown} from 'react-icons/md'

import UserSetting from '../components/Modals/UserSetting'

const Navbar = () => {
    const { data} = useContext(UserContext)
    const [isModalActive, setIsModalActive] = useState(false);


    return (
        <div className="flex w-full justify-between py-[2vh] px-[3vw] bg-slate-700 text-white relative">
            <div className="flex space-x-2">
                {/* <div className="">
                    <img src="https://source.unsplash.com/random" alt="" className='w-10 h-10 rounded-full' />
                </div> */}
                <div className="text-3xl">
                    <Link to="/">
                        <span>Forum</span>
                        <span className="text-green-300">App</span>
                    </Link>
                </div>
            </div>
            <div>
                <label className="flex items-center space-x-4 bg-white text-slate-600 px-4 py-1 rounded-lg" htmlFor="search">
                    <FaSearch style={{ fontSize: "1.8rem" }} />
                    <input className='input-form border-none text-xl focus:ring-0' type="text" id='search' placeholder='Search Forum' />
                </label>
            </div>
            {data.isLoggedIn ?
                <div className="cursor-pointer select-none" onClick={()=> setIsModalActive(!isModalActive)}>
                    <div className="flex space-x-2 items-center">
                        <div className="">
                            <img src={data.signed_user.avatar} alt="" className='w-10 h-10 rounded-full' />
                        </div>

                        <div>
                            <h6>{data.signed_user.name}</h6>
                            <h6 className="text-slate-400">{data.signed_user.username}</h6>
                        </div>
                        <div className="flex items-center text-3xl">
                            <MdOutlineArrowDropDown />
                        </div>
                    </div>
                    {isModalActive && <UserSetting/>}
                    
                </div> :
                <div>
                    <Link to='/login'>
                        <button className='bg-white text-black py-1 px-4 text-xl font-semibold rounded-sm cursor-pointer'>Login</button>
                    </Link>
                </div>
            }
        </div>
    )
}

export default Navbar
