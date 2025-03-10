import httpRequest from '../utils/httpRequest';

const API_BASE_URL = "http://localhost:8888";

const useAuthApi = () => {
    const login = async ({ usernameOrEmail, password }) => {
        try {
            const res = await httpRequest.post(
                `${API_BASE_URL}/auth/signin`,
                { usernameOrEmail, password }
            );

            if (res?.data?.token) {
                localStorage.setItem("jwt", res.data.token); // Lưu token vào localStorage
            }

            return res?.data;
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            return error.response;
        }
    };

    const signUp = async (data) => {
        try {
            const res = await httpRequest.post(
                `${API_BASE_URL}/auth/signup`,
                data
            );
            return res?.data;
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            return error.response;
        }
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem("jwt");

            const res = await httpRequest.post(`${API_BASE_URL}/auth/logout`, {});

            localStorage.removeItem("jwt"); // Xóa token sau khi logout
            return res?.data;
        } catch (error) {
            console.error("Lỗi đăng xuất:", error);
            return error.response;
        }
    };

    return { login, signUp, logout };
};

export default useAuthApi;
