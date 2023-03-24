import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContestCard from '../Components/ContestCard';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useNavigate } from "react-router-dom";

const MyContest = () => {
    const [contest, setContest] = useState([]);
    const navigate = useNavigate()
    const handleClick = () => {
        if (localStorage.getItem("userId")) {
            navigate("/create-contest");
        } else {
            navigate("/register");
        }
    };

    //get user contest
    const getUserContest = async () => {
        try {
            const id = localStorage.getItem('userId');
            const { data } = await axios.get(`/api/v1/contest/user-contest/${id}`);
            if (data?.success) {
                setContest(data?.userContest.contest);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserContest();
    }, []);

    console.log(contest);

    return (
        <>
            <Navbar />
            {contest && contest.length > 0 ? (
                contest.map((contest) => (
                    <ContestCard
                        id={contest._id}
                        isUser={true}
                        title={contest.title}
                        description={contest.description}
                        image={contest.image}
                        username={contest.user.username}
                        time={contest.createdAt}
                    />
                ))
            ) : (
                <>
                    <h1 className='text-center font-bold text-2xl'>You have not created any contest yet.</h1>
                    <div className="flex justify-center">
                        <button onClick={handleClick} className="bg-red-500 text-white  px-8 my-10   py-4 rounded-full mr-4">
                            Create Contest
                        </button>

                    </div>
                </>
            )}
            <Footer />
        </>

    );
};

export default MyContest;