import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const ContestDetail = () => {
    const [contest, setContest] = useState({})
    const navigate = useNavigate()
    const id = useParams().id
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: '',
    });
    //get Contest details
    const getContestDetail = async () => {
        try {
            const { data } = await axios.get(`/api/v1/contest/get-contest/${id}`)
            if (data?.success) {
                setContest(data?.contest)
                setInputs({
                    title: data?.contest.title,
                    description: data?.contest.description,
                    image: data?.contest.image
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getContestDetail()
    }, [id])



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
            const { data } = await axios.put(`/api/v1/contest/update-contest/${id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: id,
            })
            if (data?.success) {
                toast.success("Contest Successfully Updated");
                navigate('/my-contest');
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
                <h2 className="text-2xl mb-6">Update a Contest</h2>

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
                    Update
                </button>
            </form>
        </>
    )
}

export default ContestDetail