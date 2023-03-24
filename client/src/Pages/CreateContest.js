import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';




const CreateContest = () => {
    //getting userid
    const id = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: '',
    });

    //input Change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    //form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/api/v1/contest/create-contest`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            })
            if (data?.success) {
                toast.success("Contest Successfully created");
                navigate('/');
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="bg-gray-200 p-6 rounded-md"
            >
                <h2 className="text-2xl mb-6">Create a Contest</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Title</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="title"
                        name="title"
                        type="text"
                        value={inputs.title}
                        required
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">
                        Description
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        name="description"
                        type="text"
                        required
                        value={inputs.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2">Image Url</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        name="image"
                        type="text"
                        required
                        value={inputs.image}
                        onChange={handleChange}
                    />
                </div>

                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
                    type="submit"
                >
                    Create Contest
                </button>
            </form>
        </>
    );
};

export default CreateContest;