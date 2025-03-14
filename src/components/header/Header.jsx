import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import useAuthApi from '../../services/authServices.js';

ReactModal.setAppElement('#root');
const Header = () => {
    const { logout } = useAuthApi();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
    const navigate = useNavigate();

    const toggleOpen = () => setModalIsOpen((prev) => !prev);
    const closeModal = () => setModalIsOpen(false);

    const token = Cookies.get('jwt');
    const decode = jwtDecode(token);
    const roleId = Number(decode.roleId); 

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogOut = async () => {
        try {
            const res = await logout();
            setIsLoggedIn(false);
            toast.success(res.data.message, { autoClose: 1000 });
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            toast.error('Đăng xuất thất bại, hãy thử lại!');
            console.log(error);
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <header className="w-full bg-white shadow-md border-b px-6 py-3 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
                <a href="/"><span className="text-lg font-semibold">Logo</span></a>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex space-x-6 text-gray-800 font-medium">
                <a href="#" className="hover:text-blue-500">Thể loại</a>
                <a href="/favorite-story" className="hover:text-blue-500">Theo dõi</a>
                <a href="/post-story" className="hover:text-blue-500">Thêm sách</a>
                {(roleId <= 2) && <a href="/managed-story" className="hover:text-blue-500">Quản lý</a>}
                {(roleId === 0) && <a href="/add-genre" className="hover:text-blue-500">Thể loại</a>}
            </nav>
            
            {/* Search Box */}
            <div className="flex items-center space-x-3">
                <input type="text" placeholder="Tìm kiếm" className="border px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            
            {/* User Actions */}
            <div>
                {isLoggedIn ? (
                    <button onClick={handleLogOut} className="text-gray-600 hover:text-gray-900">Đăng xuất</button>
                ) : (
                    <button onClick={handleLogin} className="text-gray-600 hover:text-gray-900">Đăng nhập</button>
                )}
            </div>
        </header>
    );
};

export default Header;
