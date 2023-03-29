import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../middlewares/User-state'
import axios from 'axios'

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [alltags, setTags] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const { data } = useContext(UserContext);
    const navigate = useNavigate();

    const split_tags = alltags.split(',');
    const tags = split_tags.map(tag => tag.trim())

    async function submitData(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        if (image !== '') {
            formData.append('image', image);
        }
        if (!tags[0] !== '') {
            formData.append('tags', tags);
        }


        if (data.signed_user._id) {
            const author = data.signed_user._id;
            formData.append('author', author)
            await axios.post(`${process.env.REACT_APP_API_URL}/post/create`, formData)
                .then(res => {
                    if (res.status === 200) {
                        navigate('/')
                    }
                })
                .catch(err => console.log(err))
        }
    }

    const handleImage = async (e) => {
        const file = e.target.files[0]
        setImagePreview(URL.createObjectURL(file))
        setImage(file)
    }


    return (
        <div className="w-full flex justify-center">
            <div className='max-w-3xl w-10/12 md:w-3/5 flex flex-col bg-white dark:bg-slate-700 mt-10 p-3 space-y-3 shadow-lg'>
                <form onSubmit={submitData}>
                    <div className='border-white border-b-2 space-y-4'>
                        <div>

                        </div>
                        <div className='w-full'>
                            <input type="text" placeholder='Title' className='w-full rounded-md' value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <textarea name="description" id="" cols="30" rows="3" placeholder='Text (optional)' className='w-full rounded-md' value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div>
                            <input type="text" placeholder='Finance, Memes' className='rounded-md mb-4' value={alltags} onChange={(e) => setTags(e.target.value)} />
                        </div>
                        <div className=''>
                            <input className='text-white ' type="file" accept='image/*' name="file" id="file" onChange={(e) => handleImage(e)} />
                        </div>
                        <div className='mb-4'>
                            {imagePreview && <img src={imagePreview} alt="" className='h-screen w-min' />}
                        </div>
                    </div>
                    <div className='w-full flex justify-end my-4 space-x-4'>
                        <button className='createPostBtn dark:border-white text-slate-400 hover:bg-slate-600'>Save Draft</button>
                        <button type='submit' className='createPostBtn bg-white hover:bg-slate-200'>Post</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreatePost
