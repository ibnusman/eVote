import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { TwoFA } from './components/TwoFA.JSX'
import { ForgetPassword } from './components/ForgetPassword'
import { ChangePassword } from './components/ChangePassword'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { Navbar } from './components/Navbar'


function App() {

  return (
    <>
      
       <Navbar/>
      {/* <Signup/> */}
{/* <TwoFA/> */}
      {/* <Login/> */}
      {/* <ForgetPassword/> */}
      {/* <ChangePassword/> */}
    </>
  )
}

export default App
