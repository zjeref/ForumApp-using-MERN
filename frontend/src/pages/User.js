import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import PostsCard from '../components/Home/PostsCard'
import CreatePost from '../components/Home/CreatePost'
import Footer from '../components/Footer'
import UserDetail from '../components/Home/UserDetail'

const User = () => {
    const params = useParams();
    const id = params.id;
    const [userProfile, setuserProfile] = useState();
    const [userPost, setUserPost] = useState();

    useEffect(() => {
        async function fetchUser() {
            await axios.post(`${process.env.REACT_APP_API_URL}/user/${id}`)
                .then(res => {
                    setuserProfile(res.data)
                })
                .catch(err => console.error(err))
        }
        async function fetchUsersPost() {
            await axios.get(`${process.env.REACT_APP_API_URL}/post/user/${id}`)
                .then(res => {
                    setUserPost(res.data)
                })
                .catch(err => console.error(err))
        }
        fetchUser();
        fetchUsersPost();
    }, [id])
    // console.log(userPost)
    return (
        <div className="w-full text-white">
            <div className="w-full flex justify-center ">
                <div className="w-4/5 flex space-x-7  my-[5vh]">
                    <div className="w-4/6 flex flex-col items-center">
                        <CreatePost />

                        {userPost?.map((post) => {
                            return <PostsCard key={post?._id} post={post} />
                        })}

                    </div>
                    <div className="w-2/6 flex flex-col space-y-4">
                        <UserDetail user={userProfile} post={userPost} />
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default User
