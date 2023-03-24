import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        if (localStorage.getItem("userId")) {
            navigate("/create-contest");
        } else {
            navigate("/register");
        }
    };
    return (
        <header
            className="h-screen bg-cover bg-center"
            style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1542992804-34f8f4cb193b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8cGhvdG9zaG9vdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60)`,
                height: "75vh",
            }}
        >
            <div className="flex flex-col items-center justify-center h-full bg-gray-900 bg-opacity-50">
                <h1 className="text-5xl text-white font-bold text-center mb-8">
                    Welcome to KPRContest!
                </h1>
                <p className="text-white text-center mb-12 max-w-md">
                    Join KprShooter's photo contest and submit your best shots for a chance to win exciting prizes. Get votes from other users and increase your chances of winning. Don't miss out on this opportunity to showcase your photography skills!
                </p>
                <div className="flex justify-center">
                    <button onClick={handleClick} className="bg-white text-black px-8 py-4 rounded-full mr-4">
                        Join Contest
                    </button>
                    <button
                        className="bg-red-500 text-white px-8 py-4 rounded-full"
                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    >
                        About Us
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;