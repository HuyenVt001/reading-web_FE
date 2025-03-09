import { useState } from 'react';
import { useAsyncError, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Loader2 } from 'lucide-react';
import useAuthApi from '../../services/authServices';

const API_BASE_URL = "http://localhost:8888";

function Signup() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const { signUp } = useAuthApi();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await signUp(formData);
            toast.success('Đăng ký thành công! 🎉', { autoClose: 500 });
            navigate('/auth/signin');
        } catch (error) {
            console.error('Error signing up:', error);
            toast.error(error.response?.data?.message || 'Đăng ký thất bại! 😢', { autoClose: 3000 });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Chào mừng !</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Tài khoản</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="w-full p-2 border rounded mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="w-full p-2 border rounded mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
                            className="w-full p-2 border rounded mt-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                                Đang xử lý...
                            </>
                        ) : (
                            'Đăng ký'
                        )}
                    </button>
                </form>
                <p className="text-sm text-center mt-4">
                    Đã có tài khoản?{' '}
                    <a href="/auth/signin" className="text-blue-500">
                        Đăng nhập
                    </a>
                </p>
            </div>
            <ToastContainer position="top-right" />
        </div>
    );
}

export default Signup;
