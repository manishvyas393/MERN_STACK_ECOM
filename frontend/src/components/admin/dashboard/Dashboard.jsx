import React from 'react'
import { Typography } from "@material-ui/core"
import SideBar from '../sidebar/SideBar'
import "chart.js/auto"
import { Doughnut,Line } from "react-chartjs-2"
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import "./dashboard.css"
import { useEffect } from 'react'
import { adminAllProductsAction } from '../../../actions/adminProductsAction'
import { getAdminAllUser } from '../../../actions/adminAllUsersAction'
import { getAdminAllOrders } from '../../../actions/adminAllOrdersAction'
const Dashboard = () => {
      const dispatch = useDispatch()
      const { allUsers } = useSelector(state => state.adminAllUsers)
      const { adminProducts } = useSelector(state => state.adminProducts)
      const { adminOrders } = useSelector(state => state.adminAllOrders)
      let outOfStock = 0
      adminProducts && adminProducts.forEach(item => {
            if (item.stock === 0) {
                  outOfStock += 1;
            }
            
      });
      let totalAmount = 0;
      adminOrders&&
            adminOrders.forEach((item) => {
                  totalAmount += item.totalPrice;
            });
      const lineState = {
            labels: ["Initial Amount", "Amount Earned"],
            datasets: [
                  {
                        label: "TOTAL AMOUNT",
                        backgroundColor: ["tomato"],
                        hoverBackgroundColor: ["rgb(197, 72, 49)"],
                        data: [0, totalAmount],
                  },
            ],
      }
      const doughnutState = {
            labels: ["Out of Stock", "InStock"],
            datasets: [
                  {
                        backgroundColor: ["#00A6B4", "#6800B4"],
                        hoverBackgroundColor: ["#4B5000", "#35014F"],
                        data: [outOfStock,adminProducts.length-outOfStock],
                  },

            ],

      };

      useEffect(() => {
            dispatch(adminAllProductsAction())
            dispatch(getAdminAllUser())
            dispatch(getAdminAllOrders())
      },[dispatch])
      return (
            <div className='dashboard'>
                  <SideBar />
                  <div className="dashboardContainer">
                        <Typography component="h1">Dashboard</Typography>
                        <div className="dashboardSummary">
                              <div>
                                    <p>
                                          Total Amount<br />₹{totalAmount}
                                    </p>
                              </div>
                              <div className="dashboardSummaryBox2">
                                    <Link to="/admin/products">
                                          <p>Products</p>
                                          <p>{adminProducts.length}</p>
                                    </Link>
                                    <Link to="/admin/orders">
                                          <p>Orders</p>
                                          <p>{adminOrders.length}</p>
                                    </Link>
                                    <Link to="/admin/users">
                                          <p>Users</p>
                                          <p>{allUsers.length}</p>
                                    </Link>
                              </div>
                        </div>
                        <div className="lineChart">
                              <Line data={lineState} />
                        </div>
                        <div className="doughnutChart">
                              <Doughnut data={doughnutState} />
                        </div>
                  </div>
            </div>
      )
}

export default Dashboard
