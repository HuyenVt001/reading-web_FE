import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthApi from '../../services/authServices';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuthApi();
    const [isLoading, setIsLoading] = useState(false);

    const [usernameOrEmail, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await login({ usernameOrEmail, password });
            console.log(response);
            if (response.status == 200) {
                navigate('/');
                toast.success(response.message, { autoClose: 3000 });
            } else {
                toast.error(response.message, { autoClose: 3000 });
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
            toast.error(error.response?.data?.message || 'Đăng nhập thất bại!', { autoClose: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-semibold">Đăng nhập</h2>
                <form onSubmit={handleSubmit}>
                    {/* Tên tài khoản */}
                    <div className="mb-4">
                        <label className="mb-1 block text-sm font-medium text-gray-600">Tên tài khoản</label>
                        <input
                            type="text"
                            value={usernameOrEmail}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded-md border p-2 outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Mật khẩu */}
                    <div className="mb-4">
                        <label className="mb-1 block text-sm font-medium text-gray-600">Mật khẩu</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-md border p-2 outline-none focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Nút đăng nhập */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-md bg-blue-500 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
                    >
                        {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                    </button>

                    {/* Quên mật khẩu */}
                    <div className="mt-2 text-right text-sm">
                        <a href="#" className="text-blue-500 hover:underline">
                            Quên mật khẩu?
                        </a>
                    </div>
                </form>

                {/* Hoặc */}
                <div className="my-6 flex items-center">
                    <div className="h-px flex-1 bg-gray-300"></div>
                    <span className="mx-4 text-gray-500">Hoặc</span>
                    <div className="h-px flex-1 bg-gray-300"></div>
                </div>

                {/* Đăng ký tài khoản */}
                <div className="mt-4 text-center text-sm">
                    Bạn chưa có tài khoản?{' '}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Đăng ký tài khoản
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
