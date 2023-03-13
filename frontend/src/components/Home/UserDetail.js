import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../middlewares/User-state'
import axios from 'axios'


const UserDetail = ({ user, post }) => {
    const { data } = useContext(UserContext);

    const [userDetail, setUserDetail] = useState({})

    const [isFollowing, setIsFollowing] = useState(false);

    let followId

    useEffect(() => {
        setUserDetail(user)
        followId = data.signed_user._id;
    }, [user])

    useEffect(() => {
        if (userDetail) {
            console.log("ssshere")
            if (userDetail.followers && userDetail.followers.includes(followId)) {
                setIsFollowing(true);
                console.log("here")
            } else {
                setIsFollowing(false);

            }

        }

    }, [userDetail]);
    console.log(userDetail)

    const updateFollow = async (action) => {

        await axios.put(`${process.env.REACT_APP_API_URL}/follow/${userDetail._id}/${action}`, { followId })
            .then(res => {
                setUserDetail(res.data)
            })
            .catch(err => console.error(err))
    }


    const convertDate = (date) => {
        date = new Date(userDetail?.createdAt);
        const formattedDate = date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });
        return formattedDate;
    }

    return (
        <div className="w-full bg-slate-700 rounded-md ">
            <div className="w-full h-20 bg-blue-500">
            </div>
            <div className="p-4 space-y-4">

                <div className="p-6 -mt-20" >
                    <img className="rounded-3xl" src={userDetail?.avatar} alt="" />
                </div>
                <div className="text-center text-xl">
                    <p>{userDetail?.name}</p>
                    <p className="text-slate-400">{userDetail?.userDetailname}</p>
                </div>
                <div className="w-full flex justify-between p-[3%]">
                    <div className="text-center  w-1/2">
                        <p>Posts</p>
                        <p className="text-slate-400">{post?.length}</p>
                    </div>
                    <div className="text-center  w-1/2">
                        <p>Cake Day</p>
                        <p className="text-slate-400">{convertDate(userDetail?.createdAt)}</p>
                    </div>
                </div>
                <div className="w-full flex justify-between p-[3%]">
                    <div className="text-center w-1/2">
                        <p>Followers</p>
                        <p className="text-slate-400">{userDetail?.followers?.length}</p>
                    </div>
                    <div className="text-center  w-1/2">
                        <p>Following</p>
                        <p className="text-slate-400">{userDetail?.followings?.length}</p>
                    </div>
                </div>
                <div className='text-center'>
                    <button className='sideBtn w-full bg-white text-slate-800' onClick={(e) => updateFollow(e.target.value.toLowerCase())}>
                        {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                </div>

            </div>
        </div>
    )
}

export default UserDetail
