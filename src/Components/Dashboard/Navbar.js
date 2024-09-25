import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { account } from '../../Appwrite/Config'

const Navbar = () => {
    const navigate = useNavigate()
    const [showLinks, setShowLinks] = useState(false)

    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            navigate("/")
            alert("Logged Out Succesfully")
        } catch (error) {

        }
    }

    const handleBurgerClick = () => {
        setShowLinks(!showLinks)
    }

    return (
        <div className='shadow-lg text-white'>
            <header className="w-full bg-gray-700 p-4 flex justify-between items-center">
                <div className="text-3xl font-bold text-white">MB</div>
                <nav className="flex justify-end md:justify-around items-center w-[80%] md:w-1/3 space-x-4">
                    <NavLink className={`[&.active]:text-white [&.active]:underline underline-offset-4 md:block ${showLinks ? 'block' : 'hidden'}`} to="/Home">Home</NavLink>
                    <NavLink className={`[&.active]:text-white [&.active]:underline underline-offset-4 md:block ${showLinks ? 'block' : 'hidden'}`} to="/CreatePost">Create Posts</NavLink>
                    <NavLink className={`[&.active]:text-white [&.active]:underline underline-offset-4 md:block ${showLinks ? 'block' : 'hidden'}`} to="/MyPosts">My-Posts</NavLink>
                    <button className='py-1 px-4 bg-white rounded text-gray-700 font-semibold hover:bg-gray-300' onClick={handleLogout}>Logout</button>
                    {/* Add a burger icon */}
                    <button className="md:hidden flex justify-center w-8 h-8 bg-gray-200 rounded-full" onClick={handleBurgerClick}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="4" y="4" width="8" height="8" rx="1" fill="#fff" />
                            <rect x="12" y="4" width="8" height="8" rx="1" fill="#fff" />
                            <rect x="4" y="12" width="8" height="8" rx="1" fill="#fff" />
                        </svg>
                    </button>
                </nav>
            </header>
        </div>
    )
}

export default Navbar