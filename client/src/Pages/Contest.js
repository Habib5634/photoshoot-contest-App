import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ContestCard from '../Components/ContestCard';

import "./contest.css"



const Contest = () => {
    const [contest, setContest] = useState([]);




    //get Contests
    const getAllContest = async () => {
        try {
            const { data } = await axios.get(`/api/v1/contest/all-contest`);

            if (data?.success) {
                setContest(data && data.contest);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllContest();
    }, []);

    const sliderRef = useRef(null);
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 5000,
    };


    return (
        <>

            <div className="relative py-10 bg-white">
                <h1 className='text-center font-bold text-red-500 text-4xl'><span className='font-bold text-gray-700 text-4xl'>Running</span> Contest</h1>
                <div className='border-b-4 border-red-500 w-28 mx-auto pt-3'></div>
                <div className='border-b-4 border-red-500 w-40 mx-auto pt-1'></div>
                <p className='w-1/2 md:w-1/3 mx-auto text-center pt-4'>Check out the ongoing photo contest on KprShooter! Browse through the current entries and vote for your favorite shots. Join the contest and submit your own entries to showcase your photography skills and win exciting prizes.</p>

                <Slider ref={sliderRef} {...settings}>
                    {contest && contest.map((contest) => (
                        <div key={contest?._id} className="p-4">
                            <ContestCard
                                id={contest?._id}
                                isUser={localStorage.getItem('userId') === contest?.user?._id}
                                title={contest?.title}
                                description={contest?.description}
                                image={contest?.image}
                                username={contest?.user?.username}
                                time={contest?.createdAt}
                                userType={localStorage.getItem('userType')}
                            />
                        </div>
                    ))}
                </Slider>
                <button className="text-red-500 absolute text-2xl left-0 top-2/4 transform -translate-y-2/4" onClick={() => sliderRef.current.slickPrev()}><FaChevronLeft /></button>
                <button className="text-red-500 absolute right-0  text-2xl top-2/4 transform -translate-y-2/4" onClick={() => sliderRef.current.slickNext()}><FaChevronRight /></button>
            </div>


        </>

    );
};

export default Contest;
