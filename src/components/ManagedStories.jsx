import React, { useState, useEffect } from "react";
import storyApi from "../services/storyServices";
import { handler } from "@tailwindcss/line-clamp";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManagedStories = () => {
    const navigate = useNavigate();
    const { getManagedStories, getChapter, updateStory, deleteStory } = storyApi();
    const [stories, setStories] = useState([]); 

    const handlerGetChapter = async (storyId) => {
        try {
            navigate('/get-chapter');
        } catch (error) {
            console.log(error);
        }
    }
    const handlerUpdate = async (storyId) => {
        try {
            navigate('/update-story');
        } catch (error) {
            console.log(error);
        }
    }
    const handlerDelete = async (storyId) => {
        try {
            const response = await deleteStory(storyId);
            if(response.status === 200){
                navigate('/delete-story');
                toast.success("Xóa sách thành công!");
            }else
                toast.error("Xóa sách thất bại!");
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await getManagedStories();
                //console.log(response.managedStories);
                setStories(response.managedStories); 
            } catch (error) {
                console.error("Lỗi khi lấy danh sách stories:", error);
            }
        };

        fetchStories();
    }, []); 

    return (
        <div className="max-w-3xl mx-auto">
            {stories.map((story) => (
                <div key={story.id} className="flex items-center p-3 border-b border-gray-300 bg-gray-100 hover:bg-gray-200">
                    {/* Ảnh bìa */}
                    <img src={story.image} alt={story.title} className="w-28 h-16 object-cover rounded-md mr-4 border" />

                    {/* Thông tin sách */}
                    <div className="flex-1">
                        <div className="flex items-center">
                            <span className="text-gray-700"></span>
                            <a href="#" className="text-lg font-semibold text-gray-800 hover:text-blue-500 ml-2">
                                {story.title}
                            </a>
                        </div>

                        {/* Tác giả */}
                        <div className="text-sm italic text-gray-600 flex items-center mt-1">
                            {story.authorName}
                        </div>

                        {/* Số chương */}
                        {(story.latestChapterId>0) && 
                            <div className="text-sm text-gray-600 flex items-center mt-1">
                                {story.latestChapterId} chương
                            </div>
                        }
                    </div>
                    <button className="p-5" onClick={() => handlerGetChapter(story.id)}>
                        Danh sách chương
                    </button>
                    <button className="p-5" onClick={() => handlerUpdate(story.id)}>
                        Thông tin
                    </button>
                    <button className="p-5" onClick={() => handlerDelete(story.id)}>
                        Xóa truyện
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ManagedStories;
