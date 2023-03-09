import React from 'react'
import { Outlet, } from 'react-router-dom'



const Landing = () => {
    return (
        <div className="w-screen flex flex-col items-center">
            <div className="border-2 border-black p-2 mt-[10vh] text-white">
                <div>
                    <h1 className="text-3xl ">Hi! Welcome to Forum App</h1>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>

    )
}


export default Landing
