import React, { useState, useEffect } from "react";
import storyApi from "../services/storyServices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "./Header";
import useAuthApi from "../services/authServices";

const ManagedStories = () => {
    const navigate = useNavigate();
    const { getManagedStories, deleteStory } = storyApi();
    const [stories, setStories] = useState([]); 
    const { getRole } = useAuthApi();

    const roleId = getRole();

    const handlerDelete = async (event, storyId) => {        
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa sách này không?");
        if (!isConfirmed) return;

        try {
            const response = await deleteStory(storyId);
            if (response.status === 200) {
                toast.success("Xóa sách thành công!");
            } else {
                toast.error("Xóa sách thất bại!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Đã xảy ra lỗi khi xóa!");
        }
    };

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
        <>
            <Header></Header>
            <div className="max-w-3xl mx-auto">
                <h2>Danh sách truyện quản lý</h2>
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
                        { roleId <= 1 && 
                            <>
                                <button className="p-5">
                                    Quản trị viên
                                </button>
                                <button className="p-5" onClick={(event) => handlerDelete(event, story.id)}>
                                    Xóa truyện
                                </button>
                            </>
                        }
                    </div>
                ))}
            </div>
        </>
    );
};

export default ManagedStories;
