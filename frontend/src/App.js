import { useReducer } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { UserContext, initialState, reducer } from './middlewares/User-state'
import Protected from './middlewares/Protected'
import SemiProtected from './middlewares/SemiProtected'

import Landing from './pages/Landing'
import Login from './components/Landing/Login'
import Register from './components/Landing/Register'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'
import User from './pages/User'



function App() {
  const [userData, dispatch] = useReducer(reducer, initialState)


  return (
    <BrowserRouter>
      <UserContext.Provider value={{ data: userData, dispatch: dispatch }}>

        <Navbar />
        <Routes>
          <Route path="/login" element={<Landing />}>
            <Route path="" element={<Login />} />
          </Route>
          <Route path="/register" element={<Landing />}>
            <Route path='' element={<Register />} />
          </Route>
          <Route path='/' element={<SemiProtected Component={Home} />} />
          <Route path='/create' element={<Protected Component={CreatePost} />} />
          <Route path='/post/:id' element={<SemiProtected Component={Post} />} />
          <Route path='/user/:id' element={<SemiProtected Component={User} />} />
        </Routes>

      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
