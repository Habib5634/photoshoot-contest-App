import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import "./Navbar.css"
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../Redux/Store';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import { FaCamera } from 'react-icons/fa'

const Navbar = () => {
    // global state
    const isLogin = useSelector((state) => state.isLogin) || localStorage.getItem('userId');
    const userType = useSelector((state) => state.userType);
    const dispatch = useDispatch();

    // navigate 
    const navigate = useNavigate();

    // logout
    const handleLogout = () => {
        try {
            dispatch(authActions.logout());
            toast.success("Logout successfully");
            navigate('/login');
            localStorage.clear();
        } catch (error) {
            console.log(error);
        }
    }

    const [showSidebar, setShowSidebar] = useState(false);

    return (
        <nav className="flex items-center justify-between  bg-white p-6">
            <div className="flex items-center flex-shrink-0 text-red-500 mr-6">
                <span className="font-bold text-xl flex"><FaCamera className=' mr-1 text-2xl' />KPRSHOOTER</span>
            </div>
            <div className="w-full flex justify-end items-center">
                <div className="items-center">
                    <button
                        className="sm:hidden focus:outline-none ml-auto"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        <HiMenu size={24} />
                    </button>
                </div>
                <div className={`sm:flex ${showSidebar ? '' : 'hidden'}`} style={{ flexDirection: 'column' }}>
                    <div className="text-sm ">
                        <Link to="/" className="block inline-block lg:mt-0 text-red-500 hover:text-red-800 mr-4">
                            Contest
                        </Link>
                        {isLogin ? (
                            <>

                                <Link to="/my-contest" className="block inline-block lg:mt-0 text-red-500 hover:text-red-800 mr-4">
                                    My Contest
                                </Link>
                                {userType === 'Admin' && (
                                    <>
                                        <Link to="/create-contest" className="block inline-block lg:mt-0 text-red-500 hover:text-red-800 mr-4">
                                            Create Contest
                                        </Link>
                                    </>
                                )}
                                <button onClick={handleLogout} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white bg-red-500 hover:bg-red-800  lg:mt-0">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block inline-block lg:mt-0 text-red-500 hover:text-red-800 mr-4">
                                    Login
                                </Link>
                                <Link to="/register" className="block inline-block lg:mt-0 text-red-500 hover:text-red-800 mr-4">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;