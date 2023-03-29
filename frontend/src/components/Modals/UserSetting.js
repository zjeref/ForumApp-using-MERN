import React, { useContext } from 'react'

import { Link } from 'react-router-dom'
import { UserContext } from '../../middlewares/User-state'
import Cookies from 'js-cookie'
import { FiSettings } from 'react-icons/fi'
import { MdOutlineLogout } from 'react-icons/md'

const UserSetting = () => {
  const { dispatch } = useContext(UserContext)

  const logout = () => {
    dispatch({ type: 'login_status', payload: false })
    dispatch({ type: 'set_user', payload: {} })
    Cookies.remove('authToken')
  }

  return (
    <div className='w-max absolute bg-white dark:bg-slate-600  border-2 border-primary select-none'>
      <Link>
        <div className="flex items-center space-x-3 px-2 py-2 hover:bg-semilight hover:dark:bg-slate-700 ">
          <div><FiSettings /></div>
          <p>Account settings</p>
        </div>
      </Link>
      <div className="flex items-center space-x-3 px-2 py-2 hover:bg-semilight hover:dark:bg-slate-700 " onClick={logout}>
        <div><MdOutlineLogout /></div>
        <p>Logout</p>
      </div>
    </div>
  )
}

export default UserSetting
