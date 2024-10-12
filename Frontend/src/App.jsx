import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Protected from './components/Protected'
import Admin from './pages/Admin.jsx'
import Login from './pages/Login.jsx'
import Logout from './pages/Logout.jsx'
import UserForm from './pages/UserForm.jsx'
import './App.css'

function App() {
  return (
    <>
     <div className='w-full h-screen bg-gradient-to-r from-sky-500 to-indigo-500'>
          <BrowserRouter>
          <Routes>
             <Route path='/login' element={<Login/>}/>
             <Route path='/admin' element={<Protected Component ={Admin}/>}/>
             <Route path='/logout' element={<Logout/>}/>
             <Route path='/*' element={<UserForm/>}/>
          </Routes>
          </BrowserRouter>
     </div>
    </>
  )
}

export default App
