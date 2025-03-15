import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { Navbar } from './components/Navbar'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import { LoginForm } from './components/LoginForm'
import { SignupForm } from './components/SignupForm'


function App() {

  return (
    <>
      {/* <SignupForm/> */}
<BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<LoginForm/>}/>
      <Route path='/register' element={<SignupForm/>}/>
    </Routes>

</BrowserRouter>



       {/* <Navbar/> */}
       {/* <Landing/> */}
      {/* <Signup/> */}
{/* <TwoFA/> */}
      {/* <Login/> */}
      {/* <ForgetPassword/> */}
      {/* <ChangePassword/> */}
    </>
  )
}

export default App
