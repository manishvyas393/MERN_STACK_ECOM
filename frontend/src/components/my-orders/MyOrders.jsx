import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { useAlert } from "react-alert"
import { GetUserOrders, clearErrors } from '../../actions/orderAction'
import Typography from "@material-ui/core/Typography"
import MetaData from "../layout/MetaData"
import LaunchIcon from "@material-ui/icons/Launch"
import { DataGrid } from "@material-ui/data-grid";
import Loader from "../layout/loader/Loader"
import "./myorders.css"
import { useEffect } from 'react'

const MyOrders = () => {
      const alert = useAlert()
      const dispatch = useDispatch()
      const user = JSON.parse(localStorage.getItem("user"))
      const { orders, loading, error } = useSelector(state =>state.userOrders);
      const columns = [
            { field: "id", headerName: "Order Id", minWidth: 300, flex: 1 },
            {
                  field: "status", headerName: "Status", type: "number", minWidth: 150, flex: 0.5,
                  cellClassName: (params) => {
                        return params.getValue(params.id, "status") === "Delivered" ? "greenColor" : "redColor"
                  }
            },
            { field: "itemsQty", headerName: "Item Qty", type: "number", minWidth: 150, flex: 0.3 },
            { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
            {
                  field: "actions",
                  headerName: "Actions",
                  type: "number",
                  minWidth: 270,
                  flex: 0.5,
                  sortable: false,
                  renderCell: (params) => {
                        return (
                              <Link to={`/order/${params.getValue(params.id, "id")}`}>
                                    <LaunchIcon />
                              </Link>
                        )
                  }
            },
      ];
      const rows = [];
      orders && orders.forEach((item, index) => {
            rows.push({
                  itemsQty: item.orderItems.length,
                  id: item._id,
                  status: item.orderStatus,
                  amount: item.totalPrice,
            })
      })
      useEffect(() => {
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors())
            }
            else {
                  dispatch(GetUserOrders())
            }
      }, [dispatch, alert, error])
      return (
            <Fragment>
                  {
                        loading ?<Loader/> :
                              <Fragment>
                                    <MetaData title={`${user.name}-Orders`} />
                                    {
                                          loading ? (<Loader />) : (
                                                <div className="MyOrdersPage">
                                                      <Typography id="MyOrdersHeading">{user.name}'s Orders</Typography>
                                                      <DataGrid
                                                            rows={rows}
                                                            columns={columns}
                                                            pageSize={10}
                                                            disableSelectionOnClick
                                                            className="MyOrdersTable"
                                                            autoHeight
                                                      />

                                                </div>
                                          )
                                    }
                              </Fragment>
                  }
            </Fragment>
      )
}

export default MyOrders
