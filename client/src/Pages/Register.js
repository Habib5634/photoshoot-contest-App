import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'
import Navbar from '../Components/Navbar';

const RegistrationForm = () => {
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({ name: '', email: '', password: '' });
    const [userType, setUserType] = useState("")
    const [secretKey, setSecretKey] = useState("")

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        if (userType === "Admin" && secretKey !== 'HabibAhmed56') {
            e.preventDefault();
            alert("Invalid Admin")
        } else {
            e.preventDefault();
            try {
                const { data } = await axios.post('./api/v1/user/register', { username: inputs.name, email: inputs.email, password: inputs.password, userType: userType })
                if (data.success) {
                    toast.success("user registered successfully");
                    navigate("/login")
                }

            } catch (error) {
                if (error.response.status === 409 && error.response.data.message === 'User with this email already exists') {
                    toast.error("User with this email is already registered")
                } else {
                    toast.error("An error occurred. Please try again later")
                }
            }
        }



    };

    return (
        <>
            <Navbar />
            <div className="h-screen bg-cover bg-center content-center" >
                <form onSubmit={handleSubmit} className=" p-6 rounded-md lg:w-3/4 md:w-2/4 md:pt-6  mx-auto bg-gray-200 " >

                    <h2 className="text-5xl text-gray-700 text-center mb-6">Register Yourself</h2>
                    <div className='flex space-x-2'>
                        <label className="block text-gray-700 font-bold mb-2 " htmlFor="name">
                            User
                        </label>
                        <input
                            required
                            type="radio"
                            name='userType'
                            value="User"
                            onChange={(e) => setUserType(e.target.value)} />
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Admin
                        </label>
                        <input
                            type="radio"
                            name='userType'
                            value="Admin"
                            onChange={(e) => setUserType(e.target.value)} />
                    </div>
                    {userType === "Admin" ?
                        <>
                            <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="name">
                                Secret Key
                            </label><input
                                className="shadow appearance-none border rounded w-3/4 h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="secretKey"
                                type="text"
                                name="secretKey"
                                required
                                value={secretKey}
                                onChange={(e) => setSecretKey(e.target.value)}
                            /></> : ""}

                    <div className="mb-4 ">
                        <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-3/4 h-12 mx-auto py-2 px-3 text-gray-700  "
                            id="name"
                            type="text"
                            name="name"
                            required
                            value={inputs.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-3/4 h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            type="email"
                            value={inputs.email}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-bold mb-2 text-2xl" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-3/4 h-12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            name='password'
                            type="password"
                            required
                            value={inputs.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4" type="submit">
                        Register
                    </button><br />
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-gray-200  text-blue-800 font-semibold py-6          rounded ">
                        Already Registered?
                    </button>
                </form>
            </div>
        </>
    );
}

export default RegistrationForm; 