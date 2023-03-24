import React, { useState } from "react";
import ContestTab from "./Contest";
import CreateContestTab from "./CreateContest";
import AllUsersTab from "./AllUser";
import Navbar from '../Components/Navbar'


import OurGallary from '../Components/OurGallary'
import Footer from '../Components/Footer'
const AdminPage = () => {
    const [activeTab, setActiveTab] = useState("contest");

    return (
        <>
            <Navbar />
            <div className="bg-gray-200 min-h-screen">
                <nav className="bg-gray-800 text-white">
                    <ul className="flex justify-center space-x-4 p-4">
                        <li
                            className={`${activeTab === "contest" ? "bg-gray-700" : ""
                                } hover:bg-gray-700 cursor-pointer`}
                            onClick={() => setActiveTab("contest")}
                        >
                            Contest
                        </li>
                        <li
                            className={`${activeTab === "createContest" ? "bg-gray-700" : ""
                                } hover:bg-gray-700 cursor-pointer`}
                            onClick={() => setActiveTab("createContest")}
                        >
                            Create Contest
                        </li>
                        <li
                            className={`${activeTab === "allUsers" ? "bg-gray-700" : ""
                                } hover:bg-gray-700 cursor-pointer`}
                            onClick={() => setActiveTab("allUsers")}
                        >
                            All Users
                        </li>
                    </ul>
                </nav>
                <div className=" mx-auto mt-8">
                    {activeTab === "contest" && <ContestTab />}
                    {activeTab === "createContest" && <CreateContestTab />}
                    {activeTab === "allUsers" && <AllUsersTab />}
                </div>
            </div>


            <OurGallary />
            <Footer />

        </>
    );
};

export default AdminPage;