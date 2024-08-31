import React from 'react'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import NavBar from './components/NavBar'
import DashBoard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import PrivateadminRoute from './components/PrivateadminrRoute'
import CreatePost from './pages/CreatePost'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'
import  Home  from './pages/Home'
import Search from './pages/Search'
import Footer from './components/Footer'
import About from './pages/About'


const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow">
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/mern-blog/sign-up' element ={<Signup />}/>
        <Route path='/mern-blog/sign-in' element={<Signin/>} />
        <Route path='/mern-blog/search' element={<Search/>} />
        <Route path='/mern-blog/about' element = {<About/>}/>
        <Route element = { <PrivateRoute/>}> 
          < Route path = '/mern-blog/settings' element={<DashBoard/>} />
        </Route>
        <Route element = { <PrivateadminRoute/>}> 
          < Route path = '/mern-blog/createpost' element={<CreatePost/>} />
          < Route path = '/mern-blog/updatepost/:postid' element={<UpdatePost/>} />
        </Route>
        <Route path='/mern-blog/post/:postslug' element={<PostPage/>} />

       </Routes>
       </div>
       <Footer/>
       </div>
    </BrowserRouter>

  )
}

export default App