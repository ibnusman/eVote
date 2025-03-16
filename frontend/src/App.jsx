
import './App.css'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { Navbar } from './components/Navbar'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'



function App() {

  return (
    <>
     
<BrowserRouter>
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Signup/>}/>
      <Route path='/forgetpassword' element={<ForgetPassword/>}/>
      
    </Routes>

</BrowserRouter>



    </>
  )
}

export default App
