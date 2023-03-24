import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

import { images } from './ImagesCollection';


const AllPhotos = () => {


    const [hovered, setHovered] = useState(null);

    const handleHover = (id) => {
        setHovered(id);
    };

    const handleLeave = () => {
        setHovered(null);
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-8">
            {images.map((image) => (
                <div
                    key={image.id}
                    className="relative rounded-lg overflow-hidden cursor-pointer"
                    onMouseEnter={() => handleHover(image.id)}
                    onMouseLeave={() => handleLeave()}
                >
                    <img src={image.src} alt={image.title} className="w-full h-full object-cover" />

                    {hovered === image.id && (
                        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                            <div className="flex flex-col items-center text-white">
                                <h2 className="text-xl mb-2 mx-8">{image.title}</h2>
                                <div className="flex items-center">
                                    <FaHeart className="mr-1 text-red-500" />
                                    <span>{image.likes}k</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const Photos = () => {
    const [hovered, setHovered] = useState(null);

    const handleHover = (id) => {
        setHovered(id);
    };

    const handleLeave = () => {
        setHovered(null);
    };
    const bestImages = images.filter((image) => image.best);
    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-8">
                {bestImages.map((image) => (
                    <div
                        key={image.id}
                        className="relative rounded-lg overflow-hidden cursor-pointer"
                        onMouseEnter={() => handleHover(image.id)}
                        onMouseLeave={() => handleLeave()}
                    >
                        <img src={image.src} alt={image.title} className="w-full h-full object-cover" />

                        {hovered === image.id && (
                            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                                <div className="flex flex-col items-center text-white">
                                    <h2 className="text-xl mb-2 mx-8">{image.title}</h2>
                                    <div className="flex items-center">
                                        <FaHeart className="mr-1 text-red-500" />
                                        <span>{image.likes}k</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div></>
    );
};

const WinnerImages = () => {
    const [hovered, setHovered] = useState(null);

    const handleHover = (id) => {
        setHovered(id);
    };

    const handleLeave = () => {
        setHovered(null);
    };
    const winningImages = images.filter((image) => image.winner);
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-8">
            {winningImages.map((image) => (
                <div
                    key={image.id}
                    className="relative rounded-lg overflow-hidden cursor-pointer"
                    onMouseEnter={() => handleHover(image.id)}
                    onMouseLeave={() => handleLeave()}
                >
                    <img src={image.src} alt={image.title} className="w-full h-full object-cover" />

                    {hovered === image.id && (
                        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                            <div className="flex flex-col items-center text-white">
                                <h2 className="text-xl mb-2 mx-8">{image.title}</h2>
                                <div className="flex items-center">
                                    <FaHeart className="mr-1 text-red-500" />
                                    <span>{image.likes}k</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const OurGallary = () => {
    const [selectedLayout, setSelectedLayout] = useState('allImages');

    return (
        <div className="bg-gray-100">
            <h1 className='text-center  pt-8'><span className='font-bold text-gray-700 text-4xl'>OUR PHOTO</span><span className='font-bold text-red-500 text-4xl'> GALLARY</span></h1>
            <div className='border-b-4 border-red-500 w-28 mx-auto pt-3'></div>
            <div className='border-b-4 border-red-500 w-40 mx-auto pt-1'></div>
            <p className='w-1/2 md:w-1/3 mx-auto text-center pt-4'>Explore the current photo contest entries on KprShooter's gallery. View the stunning photographs submitted by talented photographers and vote for your favorite shots. Join the contest and showcase your own photography skills to be featured in the gallery and win exciting prizes..</p>
            <div className="flex justify-center space-x-4  border-b border-gray-300">
                <div
                    className={`text-lg border-b  text-center text-gray-700 font-medium cursor-pointer w-1/4  mt-16 ${selectedLayout === 'allImages' ? 'text-red-500 border-b-4 border-red-500' : ''
                        }`}
                    onClick={() => setSelectedLayout('allImages')}
                >
                    <i class="bi bi-lightning-fill  text-sm pr-1 text-red-500"></i>All Images
                </div>
                <div
                    className={`text-lg border-b  text-center text-gray-700 font-medium cursor-pointer w-1/4 mt-16 ${selectedLayout === 'bestImages' ? 'text-red-500 border-b-4 border-red-500' : ''
                        }`}
                    onClick={() => setSelectedLayout('bestImages')}
                >
                    <i class="bi bi-balloon-fill pr-1  text-sm text-red-500"></i>Best Images
                </div>
                <div
                    className={`text-lg border-b  text-center text-gray-700 font-medium cursor-pointer w-1/4 mt-16  ${selectedLayout === 'winnerImages' ? 'text-red-500 border-b-4 border-red-500' : ''
                        }`}
                    onClick={() => setSelectedLayout('winnerImages')}
                >
                    <i class="bi bi-folder pr-1  text-sm text-red-500"></i>Winner Images
                </div>
            </div>
            <div className="">
                {selectedLayout === 'allImages' && <AllPhotos />}
                {selectedLayout === 'bestImages' && <Photos />}
                {selectedLayout === 'winnerImages' && <WinnerImages />}
                <hr />
            </div>
        </div>
    );
};

export default OurGallary;