import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { account, database, storage } from '../../Appwrite/Config';
import { bucketId, collectionId, databaseId } from '../../Appwrite/AppwriteIds';


const CreatePost = () => {
    const [image, setImage] = useState(null);
    const [text, setText] = useState('');
    const [location, setLocation] = useState('');
    const [email, setemail] = useState('');
    const [name, setName] = useState('');
    const [Success, setSuccess] = useState(false);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);


    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };


    const handlePost = async (e) => {
        e.preventDefault();
        try {
            const db = await database.createDocument(databaseId, collectionId, 'unique()', {
                email: email,
                name: name,
                Discription: text,
                Location: location,
                Date: Date().toString().slice(0, 15)
            })
            await storage.createFile(bucketId, db.$id, image)
            setSuccess(true);
            setImage(null)
            setText('')
            setLocation('')

        } catch (error) {
            throw error;
        }
    };

    const handleLocationChange = async (event) => {
        setLocation(event.target.value)
        const location = event.target.value;
        if (location.length > 2) {
            setShowSuggestions(true);
            try {
                const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=a2f225adfc0e4520ad5f23cb8a9fb5ff`);
                const data = await response.json();
                const suggestions = data.results.map(result => result.formatted);
                // Update the state with the suggestions
                setLocationSuggestions(suggestions);

            } catch (error) {
                console.error(error);
            }
        }
        else {
            setShowSuggestions(false);
        }
    };
    

    useEffect(() => {
        try {
            account.get("current").then((user) => {
                setemail(user.email)
                setName(user.name)
            })
        } catch (error) {
            console.log(error)
        }
    }, [email])

    return (
        <div className="flex flex-col h-screen">
            <div className="bg-gray-100 mb-10">
                <Navbar />
            </div>
            <div className="flex-1 p-4">
                {!Success &&
                    <form className="flex flex-col gap-4 items-center max-w-md mx-auto p-4 h-full bg-white rounded shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="block w-full py-2 px-3 border border-gray-300 rounded-md"
                        />
                        <textarea
                            type="textarea"
                            value={text}
                            onChange={handleTextChange}
                            placeholder="Enter Blog"
                            className="block w-full h-[30vh] py-2 px-3 border border-gray-300 rounded-md mt-4"
                        />
                        <div className='w-full'>
                            <input
                                type="text"
                                value={location}
                                onChange={handleLocationChange}
                                placeholder="Enter location"
                                list="location-list"
                                className='block w-full py-2 px-3 border border-gray-300 rounded-md mt-4'
                            />
                            <datalist id="location-list">
                                {locationSuggestions.map((suggestion, index) => (
                                    <option key={index} value={suggestion}>
                                        {suggestion}
                                    </option>
                                ))}
                            </datalist>
                        </div>
                        <button
                            onClick={handlePost}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
                        >
                            Post
                        </button>
                    </form>
                }
                {
                    Success && (
                        <div className='flex justify-center items-center flex-col gap-4'>
                            <h1 className=" text-3xl font-bold text-gray-500">
                                File uploaded successfully!
                            </h1>
                            <button className='py-2 px-4 bg-gray-500 rounded-full cursor-pointer text-white' onClick={() => { setSuccess(false) }} >Upload more File</button>
                        </div>

                    )
                }
            </div>
        </div>
    );
}

export default CreatePost