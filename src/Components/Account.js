import React, { useState } from 'react';
import { account } from '../Appwrite/Config';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await account.create('unique()', email, password, name);
            navigate("/")
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col items-center justify-center w-full max-w-md p-10 h-fit bg-white rounded shadow-md">
                <h2 className="text-3xl font-bold mb-4">Create Account</h2>
                <form onSubmit={handleSubmit}
                    className='flex flex-col gap-4 w-full'
                >
                    <label className="block mb-2">
                        <span className="text-gray-700">Name</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="w-full p-2 pl-10 text-sm text-gray-700 border"
                            placeholder="John Doe"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Email</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full p-2 pl-10 text-sm text-gray-700 border"
                            placeholder="johndoe@example.com"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Password</span>
                        <div className='flex border'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 pl-10 mr-2 text-sm text-gray-700"
                                placeholder="Password"
                            />
                            <input
                                type="checkbox"
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                                className="mx-2"
                            />
                        </div>
                    </label>
                    {error && (
                        <div className="text-red-500 text-sm mb-2">{error}</div>
                    )}
                    <button
                        type="submit"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create Account
                    </button>
                    <button
                        onClick={() => { navigate("/") }}
                        className='cursor-pointer underline text-gray-700 '
                    >Already have an account ? </button>
                </form>
            </div>
        </div>
    );
};

export default Account;