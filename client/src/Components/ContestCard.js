import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';


const ContestCard = ({ title, description, image, username, id, isUser, userType }) => {
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [isUserLiked, setIsUserLiked] = useState(false);
  const isLogin = useSelector((state) => state.isLogin) || localStorage.getItem('userId');
  // const userType = useSelector((state) => state.userType);



  const handleEdit = () => {
    navigate(`/contest-detail/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/contest/delete-contest/${id}`);
      if (data?.success) {
        alert('Contest Deleted');
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };




  // Check if the user has already liked the contest using localStorage
  useEffect(() => {
    const likedContests = JSON.parse(localStorage.getItem('likedContests') || '{}');
    if (likedContests[id]) {
      setIsUserLiked(true);
    }
  }, [id]);

  const likeContest = async () => {
    try {
      // Check if the user has already liked the contest
      if (isUserLiked) {
        toast.error('You have already liked this contest');
        return;
      }

      const { data } = await axios.post(`/api/v1/contest/like-contest/${id}`);
      if (data?.success) {
        setLikes(data?.contest.likes);
        setIsUserLiked(true);

        // Update localStorage to mark the contest as liked by the user
        const likedContests = JSON.parse(localStorage.getItem('likedContests') || '{}');
        likedContests[id] = true;
        localStorage.setItem('likedContests', JSON.stringify(likedContests));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-white overflow-hidden relative p-10 px-14">

      <div className=" flex flex-wrap h-2/4">
        <div className="md:w-1/2 w-full sm:flex-col items-center justify-center  p-4 md:px-12 md:p-8 ">
          <h3 className="text-4xl text-red-500 font-semibold pb-4 mt-10  ">{title}</h3>
          <h3 className="text-xl font-semibold text-gray-700 pb-4 ">By: {username}</h3>
          <p className="text-black mt-2 pb-4"><span className='text-gray-700 font-semibold'>Description:</span> {description}</p>
          <div className=" items-center space-x-2 cursor-pointer mt-2">
            <div className="">
              {isLogin && (
                <button
                  className={`btn me-2 flex ${isUserLiked ? 'text-red-500' : 'text-gray-500'}`}
                  onClick={likeContest}
                >
                  <FaHeart className='mt-1 mr-1' />
                  {likes > 0 && `${likes} `}
                </button>
              )}
              {(isUser || userType === "Admin") && (
                <div className="flex pt-6 space-x-6 absolute bottom-12">
                  <FaEdit
                    onClick={handleEdit}
                    className="text-gray-700 text-xl hover:text-gray-700 cursor-pointer"
                  />
                  <FaTrash
                    onClick={handleDelete}
                    className="text-gray-700 text-xl hover:text-red-700 cursor-pointer"
                  />
                </div>
              )}

            </div>
          </div>


        </div>
        <div className="md:w-1/2 w-full sm:flex-col  md:p-4 lg:px-12 sm:mr-0">
          <img src={image} alt={title} className="w-full  md:h-[500px] rounded-lg " />
        </div>

      </div>




    </div>

  );
};

export default ContestCard;

