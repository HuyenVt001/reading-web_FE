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

    return { login, signUp, logout };
};

export default useAuthApi;
