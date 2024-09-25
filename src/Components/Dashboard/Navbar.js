import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { account } from '../../Appwrite/Config'

const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            navigate("/")
            alert("Logged Out Succesfully")
        } catch (error) {

        }
    }

    return (
        <div className='shadow-lg text-white'>
            <header className="w-full bg-gray-700 p-4 flex justify-between items-center">
                <div className="text-3xl font-bold text-white">MB</div>
                <nav className="flex justify-around items-center w-1/3 space-x-4">
                    <NavLink className='[&.active]:text-white [&.active]:underline underline-offset-4' to="/Home">Home</NavLink>
                    <NavLink className='[&.active]:text-white [&.active]:underline underline-offset-4' to="/CreatePost">Create Posts</NavLink>
                    <NavLink className='[&.active]:text-white [&.active]:underline underline-offset-4' to="/MyPosts">My-Posts</NavLink>
                    <button className='py-1 px-4 bg-white rounded text-gray-700 font-semibold hover:bg-gray-300' onClick={handleLogout}>Logout</button>
                </nav>
            </header>
        </div>
    )
}

export default Navbar