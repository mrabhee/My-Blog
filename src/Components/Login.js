import React, { useState } from 'react';
import { account } from '../Appwrite/Config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    // const [isUser, setIsUser] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            try {
                await account.deleteSession("current")
            } finally {
                await account.createEmailPasswordSession(email, password);
                console.log("log in")
                navigate("/Home")
            }
        } catch (error) {
            setError(error.message);
        }
    };

    // useEffect(() => {
    //     try {
    //         const acc = account.get('current')
    //         if (acc) {
    //             setIsUser(true)
    //         }
    //         else {
    //             setIsUser(false)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }

    // }, [isUser])

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <div className="flex flex-col items-center justify-center gap-4 bg-white p-10 rounded shadow-md w-full h-fit max-w-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <form onSubmit={handleLogin}
                    className='flex flex-col gap-4 w-full h-full '
                >
                    <label className="flex flex-col block mb-2 gap-2 text-xl">
                        Email
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 text-sm text-gray-700 border"
                            placeholder="example@example.com"
                        />
                    </label>
                    <label className="block gap-2 text-xl">
                        Password
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
                    <button
                        type="submit"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => { navigate("/Account") }}
                        className='cursor-pointer underline text-gray-700 '
                    >Create account ? </button>
                </form>
            </div>
            {error && (
                <div className="flex items-center justify-center text-center text-red-500 w-full max-w-md m-4 text-s">{error}</div>
            )}
        </div>
    );
};

export default Login;