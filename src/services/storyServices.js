import httpRequest from '../utils/httpRequest';
import Cookie from 'js-cookie';

const storyApi = () => {
    const postStory = async ({ title, authorName, genre, description }) => {
        const token = Cookie.get('jwt');
        console.log(token);
        try {
            const res = await httpRequest.post(`/story/post-story`, { title, authorName, genre, description }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });

            return { status: res.status, data: res.data };
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            return error.response;
        }
    };

    const getManagedStories = async () => {
        try {
            const token = Cookie.get('jwt');
            const res = await httpRequest.get('/story/managed-stories', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            });
            return { status: res.status, managedStories: res.data.managedStories };
        } catch (error) {
            console.log(error);
        }
    };

    const getChapter = async () => {
        try {
            const token = Cookie.get('jwt');
        } catch (error) {
            console.log(error);
        }
    };

    const updateStory = async (storyId, { title, authorName, description, statusId, latestChapterId, avatar, genre }) => {
        try {
            const token = Cookie.get('jwt');
            const res = await httpRequest.post(`/story/update-story/${storyId}`, { title, authorName, description, statusId, latestChapterId, avatar, genre }, {
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

    const deleteStory = async (storyId) => {
        try {
            const token = Cookie.get('jwt');
            const res = await httpRequest.post(`/story/delete-story/${storyId}`, {}, {
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

    const addManager = async (usernameOrEmail) => {
        try {
            const token = Cookie.get('jwt');
            const res = await httpRequest.post(`/story/add-manager/${storyId}`, { usernameOrEmail }, {
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

    const deleteManager = async (usernameOrEmail) => {
        try {
            const token = Cookie.get('jwt');
            const res = await httpRequest.post(`/story/delete-manager/${storyId}`, { usernameOrEmail }, {
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

    return {
        postStory,
        getManagedStories,
        getChapter,
        updateStory,
        deleteStory,
        addManager,
        deleteManager
    }
};

export default storyApi;