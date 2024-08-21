import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Login';
import SignUpPage from './pages/signup';
import ThemeToggle from './components/toggle';
import HomePage from './pages/home';
import { useAuthContext } from './Context/Authcontext';


export default function App() {
  const { authUser } = useAuthContext()
  return (
    <BrowserRouter>
      <ThemeToggle />
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignUpPage />}></Route>
      </Routes>

    </BrowserRouter >
  )
}


