import { useState, useEffect, useReducer } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { UserContext, initialState, reducer } from './middlewares/User-state'
import Protected from './middlewares/Protected'

import Landing from './pages/Landing'
import Login from './components/Landing/Login'
import Register from './components/Landing/Register'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'



function App() {
  const [userData, dispatch] = useReducer(reducer, initialState)
  

  return (
    <BrowserRouter>
      <UserContext.Provider value={{data:userData, dispatch:dispatch}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />}>
            <Route path="/" element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Route>
          <Route path='/home' element={<Protected Component={Home}/>} />
          <Route path='/create' element={<CreatePost />} />
        </Routes>

      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
