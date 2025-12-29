import React from 'react'
import Signup from './Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Header'
import Login from './Login'
import ResetPassword from '../Verifyotp'

import { useLocation } from "react-router-dom";
import Home from './Home'
import ForgotPassword from './Forgetpassword'

const Publicpage = () => {
     const location = useLocation();

 const hideHeader =
  location.pathname === "/signup" ||
  location.pathname === "/login";
  return (
    <div>
            {!hideHeader && <Header />}
    <Routes>
            <Route path='/'  element = {<Home />}/>
       <Route path = '/signup' element = {< Signup />}/>
         <Route path='/login'  element = {<Login />}/>
           <Route path='/verifyotp'  element = {<ResetPassword />}/>
              <Route path='/forget'  element = {<ForgotPassword />}/>
         </Routes>
    </div>
  )
}

export default Publicpage
