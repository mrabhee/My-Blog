import React from 'react'
import Navbar from "./Navbar"
import { useEffect, useState } from 'react';
import { account, database, storage } from '../../Appwrite/Config';
import { bucketId, collectionId, databaseId } from '../../Appwrite/AppwriteIds';


const MyPosts = () => {
    const [email, setEmail] = useState('');
    const [imgsrc, setImgsrc] = useState([]);
    const [data, setData] = useState([]);
    useEffect(() => { }, [data])

    const getData = async () => {
        try {
            const docList = database.listDocuments(databaseId, collectionId);
            const docData = (await docList).documents
            const imgList = storage.listFiles(bucketId);
            const imgData = (await imgList).files
            const imageUrls = imgData.map((img) => {
                return storage.getFilePreview(bucketId, img.$id).href
            })
            setData(docData);
            setImgsrc(imageUrls);
            console.log(imageUrls)
            console.log(docData)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (docId) => {
        try {
            await database.deleteDocument(databaseId, collectionId, docId)
            await storage.deleteFile(bucketId, docId)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        account.get('current').then((user) => {
            setEmail(user.email)
        });
        if (email) {
            getData()
        }
    }, [email, data]);
    return (
        <div className="min-h-screen flex flex-col items-center text-white">
            <div className='w-full'>
                <Navbar />
            </div>
            {data.filter(doc => doc.email === email).slice().reverse().map((doc, index) => (
                <main key={index} className="flex flex-col md:flex-col mt-8 mb-8 w-11/12 md:w-2/4 bg-white p-4 rounded-lg shadow-lg text-black">

                    {/* Name */}
                    <div className="flex items-center justify-start md:justify-start mb-4">
                        <h1 className="text-2xl font-bold">{doc.name}</h1>
                    </div>

                    {/* Post */}
                    <div className='flex flex-col md:flex-row'>

                        {/* Image */}
                        <div className="md:w-2/3">
                            <img
                                src={imgsrc.find((img) => img.includes(`files/${doc.$id}`))}
                                alt="Person standing near a railing"
                                className="rounded-lg w-full h-full object-cover border-2"
                            />
                        </div>
                        <div className="flex flex-col justify-center md:w-1/3 mt-4 md:mt-0 md:ml-4 text-center md:text-left">
                            <div className="flex flex-col justify-start items-start md:w-3/2 mt-4 md:mt-0 md:ml-4 text-left md:text-left">
                                <p className="mt-4">{doc.Discription}</p>
                                <p className="flex mt-4 items-center justify-center gap-1">
                                    <svg className="mt-1 h-6 w-6 text-gray-700" fill="none" viewBox="0 0 26 26" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    {doc.Location}</p>
                                <p className="flex mt-4 items-center justify-center gap-1">
                                    <svg className=" h-6 w-6 text-gray-700" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <rect x="4" y="5" width="16" height="16" rx="2" />  <line x1="16" y1="3" x2="16" y2="7" />  <line x1="8" y1="3" x2="8" y2="7" />  <line x1="4" y1="11" x2="20" y2="11" />  <line x1="11" y1="15" x2="12" y2="15" />  <line x1="12" y1="15" x2="12" y2="18" /></svg>
                                    {doc.Date}
                                </p>
                            </div>
                            {doc.email === email && (
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold mt-4 py-1 px-2 rounded"
                                    onClick={() => handleDelete(doc.$id)}
                                >
                                    Delete Post
                                </button>
                            )}
                        </div>
                    </div>
                </main>
            ))}
        </div>
    )
}

export default MyPosts