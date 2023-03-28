import React from 'react'
import { Outlet, } from 'react-router-dom'



const Landing = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <div className="p-2 my-[10vh] dark:text-white bg-white dark:bg-slate-700 shadow-lg">
                <div>
                    <h1 className="text-3xl text-primary dark:text-highlight">Hi! Welcome to Forum App</h1>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>

    )
}


export default Landing
