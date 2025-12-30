import React from 'react'
import {jwtDecode} from "jwt-decode"
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const token = localStorage.getItem("token")
    if (!token) return <Navigate to= "/signup"/>
    
    try {
  const decoded = jwtDecode(token);
        const now = Date.now() /1000

        if(decoded.exp < now){
            localStorage.removeItem("token")
            return <Navigate to= "/signup"/>
        }
        return children
    } catch (error) {
    localStorage.removeItem("token")
     return <Navigate to= "/signup"/>
    }

}

export default PrivateRoute
