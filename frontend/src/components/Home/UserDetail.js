import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../middlewares/User-state'
import axios from 'axios'
import Loading from '../loading'


const UserDetail = ({ user, post }) => {
    const { data } = useContext(UserContext);

    const [followId, setFollowId] = useState(null)
    const [userDetail, setUserDetail] = useState(null)
    const [loading, setLoading] = useState(null)


    useEffect(() => {
        setUserDetail(user)
        setFollowId(data.signed_user._id)
    }, [user, data])

    function checkFollow(userDetail, followId) {
        if (userDetail.followers.includes(followId)) {
            return "unfollow";
        }
        return "follow";
    }

    const updateFollow = async () => {
        try {
            setLoading(true);
            if (!followId) {
                return
            }
            const followStatus = checkFollow(userDetail, followId);
            let res;

            if (followStatus === "unfollow") {
                res = await axios.put(`${process.env.REACT_APP_API_URL}/follow/${userDetail._id}/unfollow`, { followId });

            } else {
                res = await axios.put(`${process.env.REACT_APP_API_URL}/follow/${userDetail._id}/follow`, { followId });

            }
            setUserDetail(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
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
        <div className="bg-white dark:bg-slate-700 rounded-md shadow-lg">
            <div className="w-full h-20 bg-primary">
            </div>
            {userDetail ?
                <div className="p-4 space-y-4">
                    <div className="w-full flex justify-center -mt-16" >
                        <img className="rounded-xl " src={userDetail?.avatar} alt="" />
                    </div>
                    <div className="text-center text-xl">
                        <p>{userDetail?.name}</p>
                        <p className="text-slate-400 text-sm leading-3">{userDetail?.username}</p>
                    </div>
                    <div className="w-full flex justify-between p-[3%]">
                        <div className="text-center  w-1/2">
                            <p>Posts</p>
                            <p className="text-slate-600 dark:text-slate-400">{post?.length}</p>
                        </div>
                        <div className="text-center  w-1/2">
                            <p>Cake Day</p>
                            <p className="text-slate-600 dark:text-slate-400">{convertDate(userDetail?.createdAt)}</p>
                        </div>
                    </div>
                    <div className="w-full flex justify-between p-[3%]">
                        <div className="text-center w-1/2">
                            <p>Followers</p>
                            <p className="text-slate-600 dark:text-slate-400">{userDetail?.followers?.length}</p>
                        </div>
                        <div className="text-center  w-1/2">
                            <p>Following</p>
                            <p className="text-slate-600 dark:text-slate-400">{userDetail?.followings?.length}</p>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button className='sideBtn w-full bg-white hover:bg-semilight text-slate-800' onClick={(e) => updateFollow(checkFollow(userDetail, followId))} disabled={loading}>
                            {loading ? "...." :
                                checkFollow(userDetail, followId)}
                        </button>
                    </div>

                </div> :
                <Loading />
            }
        </div>
    )
}

export default UserDetail
