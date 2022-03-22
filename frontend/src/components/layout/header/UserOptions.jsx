import React, { Fragment } from 'react'
import { SpeedDial, SpeedDialAction } from "@material-ui/lab"
import { useState } from 'react'
import ProfilePic from "../../../images/Profile.png"
import { Dashboard, ExitToApp, ListAlt, Person } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { logoutUser } from '../../../actions/userActions'
import { useDispatch } from 'react-redux'
import { ShoppingCart } from '@material-ui/icons'
import "./header.css"
import { Backdrop } from '@material-ui/core'
import { useSelector } from 'react-redux'
const UserOptions = ({ user }) => {
      const alert = useAlert();
      const navigate = useNavigate()
      const dispatch = useDispatch()
      const { cartItems } = useSelector(state => state.cart)
      const [open, setOpen] = useState(false);
      const options = [
            { icon: <ListAlt />, name: "Orders", func: orders },
            { icon: <Person />, name: "Profile", func: account },
            { icon: <ShoppingCart style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />, name: `Cart(${cartItems.length})`, func: cart },
            { icon: <ExitToApp />, name: "Logout", func: LogoutUser },
      ];
      if (user.role === "admin") {
            options.unshift({ icon: <Dashboard />, name: "Dashboard", func: dashboard })
      }
      function dashboard() {
            navigate("admin/dashboard")
      }
      function account() {
            navigate("/account")
      }
      function orders() {
            navigate("/myorders")
      }
      function cart() {
            navigate("/cart")
      }
      function LogoutUser() {
            dispatch(logoutUser())
            navigate("/")
            alert.success("Logged Out")

      }
      return (
            <Fragment>
                  <Backdrop open={open} style={{ zIndex: "10" }} />
                  <SpeedDial
                        ariaLabel='SpeedDial tooltip example'
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        style={{ zIndex: "11" }}
                        direction='down'
                        className="SpeedDial"
                        icon={
                              <img className='SpeedDialIcon'
                                    src={user.avatar.url ? user.avatar.url : ProfilePic}
                                    alt='Profile-Pic' />
                        }
                  >
                        {
                              options.map(item => (
                                    <SpeedDialAction icon={item.icon} tooltipTitle={item.name} onClick={item.func} key={item.name} tooltipOpen />
                              ))
                        }
                  </SpeedDial>
            </Fragment>
      )
}

export default UserOptions
