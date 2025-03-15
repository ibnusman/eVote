import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Login } from './components/Login.jsx'
import { Signup } from './components/Signup.jsx'

const router = createBrowserRouter([
  {path: '/', element:<App/>},
  {path: '/login', element:<Login/>},
  {path: '/register', element:<Signup/>}


])


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <RouterProvider router={router}/>
  </StrictMode>,
)
