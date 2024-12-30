import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo2.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt="" className='logo' />
        <ul>
            <li>Home</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
        </ul>
        <div className="nav-right">
            <select>
                <option value="usd">USD</option>
                <option value="usd">EUR</option>
                <option value="usd">INR</option>
            </select>
            <button>Sign Up</button>
        </div>

    </div>
  )
}

export default Navbar