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
import DeletePost from './components/DeletePost'
import UserProfilePage from './components/UserProfilePage'
import EditUserPage from './components/EditUserPage'
import CreateBlog from './components/CreateBlog'
import NotFound from './components/NotFound'
import CommentBlog from './components/CommentBlog'

 

function App() { 
  return (
    <Routes>
      <Route path= {"*"} element={<NotFound/>}></Route>
      <Route path={"/"} element={<Home />}></Route>
      <Route path={"/users/profile"} element={<UserProfilePage />}></Route>
      <Route path={"/home"} element={<UserProtectedWrapper><Home /></UserProtectedWrapper>}></Route>
      <Route path={"/signup"} element={<UserSignUp />}></Route>
      <Route path={"/login"} element={<UserLogIn />}></Route>
      <Route path={"/logout"} element={<UserLogout />}></Route>
      <Route path={"/posts/:postId/delete"} element={<DeletePost />}></Route>
      <Route path={"/posts/:postId"} element={<SinglePost />}></Route>
      <Route path={"/blogs"} element={<BlogPage />}></Route>
      <Route path={"/categories"} element={<CategoryPage />}></Route>
      <Route path={"/about"} element={<AboutPage />}></Route>
      <Route path={"/contact"} element={<ContactPage />}></Route>
      <Route path={"/category/:categoryName"} element={<CategoryPost />}></Route> 
      <Route path={"/users/edit"} element={<EditUserPage />}></Route> 
      <Route path={"/posts/publish"} element={<CreateBlog />}></Route> 
      <Route path={"/posts/:postId/comments"} element={<CommentBlog />}></Route> 
        
    </Routes>
  );
}

export default App
