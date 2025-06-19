import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import UserSignUp from './pages/UserSignUp'
import UserLogIn from './pages/UserLogin'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import SinglePost from './pages/SinglePost'
import BlogPage from "./components/navbar/BlogPage"
import CategoryPage from './components/navbar/CategoryPage'
import AboutPage from './components/navbar/AboutPage'
import ContactPage from './components/navbar/ContactPage'
import CategoryPost from './components/CategoryPost'

 

function App() {
  

  return (
    <Routes>
      <Route path={"/home"} element={<UserProtectedWrapper><Home/></UserProtectedWrapper> }></Route>
      <Route path={"/signup"} element={<UserSignUp/>}></Route>
      <Route path={"/login"} element={<UserLogIn/>}></Route>
      <Route path={"/logout"} element={<UserLogout/>}></Route>
      <Route path={"/posts/:postId"} element={<SinglePost/>}></Route>
      <Route path={"/blogs"} element={<BlogPage/>}></Route>
      <Route path={"/categories"} element={<CategoryPage/>}></Route>
      <Route path={"/about"} element={<AboutPage/>}></Route>
      <Route path={"/contact"} element={<ContactPage/>}></Route>
      <Route path={"/category/:categoryName"} element={<CategoryPost/>}></Route>
    </Routes>
  )
}

export default App
