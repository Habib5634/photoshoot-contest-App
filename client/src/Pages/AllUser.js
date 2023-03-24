

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import "./contest.css"
const UserList = () => {
    const [users, setUsers] = useState([]);

    //get all users
    const getAllUsers = async () => {
        try {
            const res = await axios.get(`/api/v1/user/all-users`);

            if (res.data.success) {
                setUsers(res.data.data);
            }
        } catch (error) {
            console.log(error);
            console.log("user not found")
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);



    return (
        <div class="overflow-x-auto px-10">
            <table class="table-auto w-full border-collapse border border-gray-500">
                <thead>
                    <tr>
                        <th class="px-4 py-2 border border-gray-500">S.No.</th>
                        <th class="px-4 py-2 border border-gray-500">Name</th>
                        <th class="px-4 py-2 border border-gray-500">Email</th>
                        <th class="px-4 py-2 border border-gray-500">User Type</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td class="px-4 py-2 border border-gray-500">{index + 1}</td>
                            <td class="px-4 py-2 border border-gray-500 break-all">{user.username}</td>
                            <td class="px-4 py-2 border border-gray-500 break-all">{user.email}</td>
                            <td class="px-4 py-2 border border-gray-500 break-all">{user.userType}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;