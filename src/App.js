import React from 'react'
import Home from './Components/Dashboard/Home'
import Account from './Components/Account'
import Login from './Components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreatePost from './Components/Dashboard/CreatePost'
import MyPosts from './Components/Dashboard/MyPosts'



const App = () => {
  
  return (
    <BrowserRouter>
      {/* <h1>{store.Hello}</h1> */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/CreatePost" element={<CreatePost />} />
        <Route path='/MyPosts' element={<MyPosts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App