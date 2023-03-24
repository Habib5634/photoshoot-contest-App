import React from 'react'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaHouseDamage, FaPhone, FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaInstagram } from 'react-icons/fa'


const Footer = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8 md:px-20 py-4 lg:px-28 bg-gray-800">
                <div className='text-white'>
                    <h2 className='text-2xl  font-bold'>About Company</h2>
                    <p className='text-white pt-2'>KprShooter is a photography website that hosts photo contests for photography enthusiasts. Join the contest, vote for your favorite entries, and showcase your photography skills.</p>
                    <div className='flex gap-4 text-2xl pt-2 '>
                        <FaFacebookSquare className='cursor-pointer hover:text-red-500' />
                        <FaTwitterSquare className='cursor-pointer hover:text-red-500' />
                        <FaLinkedin className='cursor-pointer hover:text-red-500' />
                        <FaInstagram className='cursor-pointer hover:text-red-500' />
                    </div>
                </div>
                <div className='text-white'>
                    <h2 className=' text-2xl pb-2 font-bold'>Photo Contest</h2>
                    <ul>
                        <Link to=''><li className='pb-2 cursor-pointer hover:text-red-500'>Shop Integrated</li></Link>
                        <Link to=''> <li className='pb-2 cursor-pointer hover:text-red-500'>Photo Captured</li></Link>
                        <Link to=''><li className='pb-2 cursor-pointer hover:text-red-500'>Images Upload</li></Link>
                        <Link to=''><li className='pb-2 cursor-pointer hover:text-red-500'>Photo Branding</li></Link>
                        <Link to=''><li className='pb-2 cursor-pointer hover:text-red-500'>Photo Editing </li></Link>
                        <Link to=''><li className='cursor-pointer hover:text-red-500'>Photo Collection</li></Link>
                    </ul>
                </div>
                <div className='text-white' >
                    <h2 className=' text-2xl  font-bold'>Contact</h2>
                    <ul>
                        <Link to=''><li className='py-2 flex cursor-pointer hover:text-red-500'><FaHouseDamage className='mr-2 mt-1' />Pakistan, KPK ,Abbottabad</li></Link>
                        <Link to=''> <li className='pb-2 flex cursor-pointer hover:text-red-500'><FaEnvelope className='mr-2 mt-1' />hero5276311@gmail.com</li></Link>
                        <Link to='' ><li className=' flex cursor-pointer hover:text-red-500'> <FaPhone className='mr-2 mt-1' /> +923068969592</li></Link>

                    </ul>
                </div>


            </div>
            <div className='bg-gray-900 p-3 text-center text-white'>
                <p>@ 2023 CopyRioght: All Right Reserved</p>
            </div>
        </>
    )
}

export default Footer