import httpRequest from "../utils/httpRequest";
import Cookie from "js-cookie";

const chapterApi = () => {
    const addChapter = async (storyId) => {
        try {
            const token = Cookie.get('jwt');
            const res = await httpRequest.post(`/chapter/post-chapter/${storyId}`, { title, content }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            return { status: res.status, data: res.data };
        } catch (error) {
            console.log(error);
        }
    };

    const updateChapter = async (storyId, chapterNumber) => {
        try {
            const token = Cookie.get('jwt');
            const res = await httpRequest.post(`/chapter/update-chapter/${storyId}/${chapterNumber}`, { title, content }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            return { status: res.status, data: res.data };
        } catch (error) {
            console.log(error);
        }
    };

    const deleteChapter = async (storyId, chapterNumber) => {
        try {
            const token = Cookie.get('jwt');
            const res = await httpRequest.post(`/chapter/delete-chapter/${storyId}/${chapterNumber}`, {}, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            return { status: res.status, data: res.data };
        } catch (error) {
            console.log(error);
        }
    };

    const getChapter = async (storyId, chapterNumber) => {
        try {
            const res = await httpRequest.get(`/chapter/${storyId}/${chapterNumber}`, {});
            return { status: res.status, data: res.data };
        } catch (error) {
            console.log(error);
        }
    }

    return {
        addChapter,
        updateChapter,
        deleteChapter,
        getChapter
    };
};

export default chapterApi;