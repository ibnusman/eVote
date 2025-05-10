
import './App.css'
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { Navbar } from './components/Navbar'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgetPassword from './pages/ForgetPassword'
import VerifyUser from './pages/VerifyUser'
import ChangePassword from './pages/ChangePassword'
import Dashboard from './pages/Dashboard'
import AddCandidate from './pages/AddCandidate'
import { Candidates } from './components/Candidates'
import ElectionResult from './components/ElectionResult'
import { Download } from './components/download'
import { ProtectedRoutes } from './components/ProtectedRoutes'






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

    <Route element={<ProtectedRoutes/>}>
  
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/dashboard/candidates/:electionId' element={<AddCandidate/>}/>
      <Route path='/dashboard/result' element={<ElectionResult/>}/>
      <Route path='/dashboard/down' element={<Download/>}/>
      </Route>
      



   
      {/* <Route path='/dashboard/candidates' element={<Candidates/>}/> */}
      
    </Routes>

</BrowserRouter>



    </>
  )
}

export default App
