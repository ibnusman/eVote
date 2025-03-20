
import './App.css'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { Navbar } from './components/Navbar'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import VerifyUser from './pages/Verifyuser'
import ChangePassword from './pages/ChangePassword'
import Dashboard from './pages/Dashboard'




function App() {

  return (
    <>
   
<BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Signup/>}/>
      <Route path='/forgetpassword' element={<ForgetPassword/>}/>
      <Route path='/vu' element={<VerifyUser/>}/>
      <Route path='/changepassword' element={<ChangePassword/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      
    </Routes>

</BrowserRouter>



    </>
  )
}

export default App
