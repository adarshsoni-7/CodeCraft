import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import UserSignUp from './pages/UserSignUp'
import UserLogIn from './pages/UserLogin'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
 

function App() {
  

  return (
    <Routes>
      <Route path={"/home"} element={<UserProtectedWrapper><Home/></UserProtectedWrapper> }></Route>
      <Route path={"/signup"} element={<UserSignUp/>}></Route>
      <Route path={"/login"} element={<UserLogIn/>}></Route>
      <Route path={"/logout"} element={<UserLogout/>}></Route>
    </Routes>
  )
}

export default App
