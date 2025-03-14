import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import React from "react";
import storyApi from '../../services/storyServices.js'
import Header from '../header/Header.jsx';

const PostStory = () => {
    const navigate = useNavigate();
    const {postStory} = storyApi();
    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [genre, setGenre] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await postStory({ title, authorName, genre, description, image });
            console.log(response);
            if (response.status === 200) {
                navigate('/');
                toast.success(response.data.message, { autoClose: 3000 });
            } else {
                toast.error(response.data.message, { autoClose: 3000 });
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Thêm sách thất bại', { autoClose: 3000 });
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <>
            <Header/>
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="w-[920px] bg-[#e6e9d5] p-6 rounded-lg shadow-md">
                    <div className="bg-[#21452b] text-white font-bold text-xl p-4 rounded-t-lg">
                        Sáng tác mới
                    </div>
                    <form className="mt-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="mb-4">
                                    <label className="font-semibold block">Tên sách</label>
                                    <input 
                                        type="text" 
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"/>
                                </div>
                                <div className="mb-4">
                                    <label className="font-semibold block">Tác giả/Bút danh</label>
                                    <input 
                                        type="text" 
                                        value={authorName}
                                        onChange={(e) => setAuthorName(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"/>
                                </div>
                                <div className="mb-4">
                                    <label className="font-semibold block">Thể loại</label>
                                    <input 
                                        type="text" 
                                        value={genre}
                                        onChange={(e) => setGenre(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"/>
                                </div>
                                <div className="mb-4">
                                    <label className="font-semibold block">Ảnh bìa</label>
                                    <input 
                                        type="file" 
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-md"/>
                                </div>
                            </div>
                            <div>
                                <label className="font-semibold block">Giới thiệu</label>
                                <textarea 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full h-[290px] p-2 border border-gray-300 rounded-md resize-none"></textarea>
                            </div>
                        </div>
                        <div className="flex justify-center mt-6">
                            <button type="submit" 
                                    disabled={isLoading}
                                    className="bg-green-400 hover:bg-green-500 text-black font-semibold py-2 px-6 rounded-lg">
                                Đăng
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default PostStory;
