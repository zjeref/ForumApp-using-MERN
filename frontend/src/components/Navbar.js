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
        <div className="sm:flex w-full justify-between items-center py-[2vh] px-[3vw] bg-white dark:bg-slate-700 dark:text-white relative space-y-4 sm:space-y-0">
            <div className="flex  space-x-2">
                <div className="">
                    <img src="https://i.imgur.com/ij4XprK.jpeg" alt="" className='w-10 h-10 rounded-full' />
                </div>
                <div className="text-2xl font-bold">
                    <Link to="/">
                        <span className='text-primary dark:text-white'>Forum</span>
                        <span className="text-secondary">App</span>
                    </Link>
                </div>
            </div>
            <div>
                <label className="flex max-w-sm items-center space-x-4 border-2 border-primary dark:bg-white text-slate-600 px-4 cursor-pointer  rounded-lg" htmlFor="search">
                    <FaSearch style={{ fontSize: "1rem" }} />
                    <input className='border-none focus:ring-0 py-1' type="text" id='search' placeholder='Search Forum' />
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
                            <h6 className="text-slate-400 text-sm">{data.signed_user.username}</h6>
                        </div>
                        <div className="flex items-center text-3xl">
                            <MdOutlineArrowDropDown />
                        </div>
                    </div>
                    {isModalActive && <UserSetting/>}
                    
                </div> :
                <div>
                    <Link to='/login'>
                        <button className='border-2 border-primary dark:bg-white dark:text-black  px-3  font-semibold rounded-md cursor-pointer hover:bg-primary hover:text-white '>Login</button>
                    </Link>
                </div>
            }
        </div>
    )
}

export default Navbar
