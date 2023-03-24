import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from "../Redux/Store" //use dispatch and auth action is use for showing tab for only login users
import toast from 'react-hot-toast'
import Navbar from '../Components/Navbar';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [inputs, setInputs] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('./api/v1/user/login', { email: inputs.email, password: inputs.password })
            if (data.success) {
                localStorage.setItem("userId", data?.user._id)
                dispatch(authActions.login())
                toast.success("user Login successfully");

                if (data?.user?.userType === 'Admin') {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
                localStorage.setItem('userType', data.user.userType);
            }
        } catch (error) {
            console.log(error)
            toast.error("this email is Not Registered");
        }
    };
    return (
        <div >
            <Navbar />
            <form onSubmit={handleSubmit} className=" p-6 rounded-md lg:w-3/4 md:w-2/4 md:pt-6 mx-auto bg-gray-200">
                <h2 className="text-5xl text-gray-700 text-center mb-6">Login</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded h-12 w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        value={inputs.email}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6 mx-auto">
                    <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-3/4  h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        name='password'
                        type="password"
                        required
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </div>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4" type="submit">
                    Login
                </button> <br />
                <button
                    onClick={() => navigate("/register")}
                    className="bg-gray-200  text-blue-800 font-semibold py-6  rounded ">
                    Not a User. Pllease Register
                </button>
            </form></div>
    );
}

export default Login; 