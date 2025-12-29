import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"
 
const Header = () => {
  return (
   <header className="header">
      <div className="header-container">
        <h1 className="logo">
          <Link>AI Vault 🔥</Link>
        </h1>

        <nav className="nav">
         
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/signup" className="btn-primary">Sign Up</Link>
        </nav>
      </div>
    </header> 
  )
}

export default Header
