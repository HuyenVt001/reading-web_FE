import { root } from 'postcss';
import httpRequest from '../utils/httpRequest';

const useAuthApi = () => {
    const login = async ({ usernameOrEmail, password }) => {
        try {
            const res = await httpRequest.post(`/auth/signin`, { usernameOrEmail, password });

            if (res?.data?.token) {
                localStorage.setItem('jwt', res.data.token);
            }

            return { status: res.status, data: res.data };
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            return error.response;
        }
    };

    const signUp = async (data) => {
        try {
            const res = await httpRequest.post(`/auth/signup`, data);
            return { status: res.status, data: res.data };
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
            return error.response;
        }
    };

    const logout = async () => {
        try {
            const res = await httpRequest.post(`/auth/logout`, {});
            localStorage.removeItem('jwt');
            return { status: res.status, data: res.data };
        } catch (error) {
            console.error('Lỗi đăng xuất:', error);
            return error.response;
        }
    };

    const updateUsername = async (newUsername) => {
        try {
            const token = Cookies.get('jwt');
            const res = httpRequest.post(`/auth/update/username`, { newUsername }, {
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

    const updateAvatar = async (avatar) => {
        try {
            const token = Cookies.get('jwt');
            const res = httpRequest.post(`/auth/update/avatar`, { avatar }, {
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

    const updatePassword = async (password, newPassword) => {
        try {
            const token = Cookies.get('jwt');
            const res = httpRequest.post(`/auth/update/password`, { password, newPassword }, {
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
        login,
        signUp,
        logout,
        updateUsername,
        updateAvatar,
        updatePassword
    };
};

export default useAuthApi;
