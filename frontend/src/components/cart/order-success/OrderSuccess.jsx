import React from 'react'
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import { Typography } from '@material-ui/core'
import { Link } from "react-router-dom"
import "./ordersuccess.css"
const OrderSuccess = () => {
      return (
            <div className='OrderSuccess'>
                  <CheckCircleIcon />
                  <Typography>Your Order Has Been Placed SuccessFully</Typography>
                  <Link to="/myorders">View Orders</Link>
                  
            </div>
      )
}

export default OrderSuccess
