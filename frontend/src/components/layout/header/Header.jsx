import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../../../images/logo.png"

const Header = () => {
      const [link, setlink] = useState("/login")
      const [items, setItems] = useState(0)
      const user = JSON.parse(localStorage.getItem("user"))
      const cartItems = JSON.parse(localStorage.getItem("cartItems"))
      useEffect(() => {
            if (user) {
                  setlink("/account")
            }
            if (cartItems) {
                  setItems(cartItems.length)
            }
      }, [user, cartItems,setlink,setItems])
      return (
            <div className="Header">
                  <div className='logo'>
                        <img src={Logo} alt="" />
                  </div>
                  <div className='menu'>
                        <Link to="/">
                              <span>Home</span>
                        </Link>
                        <Link to="/products">
                              <span>Products</span>
                        </Link>
                        <Link to={link}>
                              <span>{user ? "Profile" : "Login"}</span>
                        </Link>
                        {
                              user && (
                                    <Link to="/Cart">
                                          <span>{items}Cart</span>
                                    </Link>
                              )
                        }

                  </div>
            </div>
      )
}

export default Header
