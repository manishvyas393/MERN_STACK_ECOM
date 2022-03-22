import React, { Fragment, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from 'react-redux';
import SideBar from '../sidebar/SideBar'
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import MetaData from '../../layout/MetaData';
import { adminDeleteOrderAction, clearErrors, getAdminAllOrders } from '../../../actions/adminAllOrdersAction';
import "./adminorders.css"
import { ADMIN_DELETE_ORDER_RESET } from '../../../constants/adminOrderConstants';
const AdminOrders = () => {
      const dispatch = useDispatch();
      const alert=useAlert()
      const { adminOrders, error } = useSelector(state => state.adminAllOrders)
      const { error: deleteError, isDeleted } = useSelector(state => state.adminDeleteOrder)
      const deleteOrder = (id) => {
            dispatch(adminDeleteOrderAction(id))
      }
      useEffect(() => {
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors())
            }
            if (deleteError) {
                  alert.error(deleteError)
                  dispatch(clearErrors())
            }
            if (isDeleted) {
                  alert.success("Order Deleted")
                  dispatch({type:ADMIN_DELETE_ORDER_RESET})
            }
            dispatch(getAdminAllOrders())
      },[dispatch,error,alert,isDeleted,deleteError])
      const columns = [
            { field: "id", headerName: "Order Id", minWidth: 300, flex: 1 },
            {
                  field: "status",
                  headerName: "Status",
                  minWidth: 150, flex: 0.5,
                  cellClassName: (params) => {
                        return params.getValue(params.id, "status") === "Delivered" ?
                              "greenColor" : "redColor";
                  },
            },
            { field: "itemsQty", headerName: "Order Qty", type: "number", minWidth: 150, flex: 0.4 },
            { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
            {
                  field: "actions",
                  headerName: "Actions",
                  type: "number",
                  minWidth: 150,
                  flex: 0.3,
                  sortable: false,
                  renderCell: (params) => {
                        return (
                              <Fragment>
                                    <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                                          <EditIcon />
                                    </Link>
                                    <Button onClick={() => deleteOrder(params.getValue(params.id, "id"))}>
                                          <DeleteIcon />
                                    </Button>
                              </Fragment>
                        )
                  }
            },
      ];
      const rows = [];
      adminOrders && adminOrders.forEach((order) => {
            rows.push({
                  id: order._id,
                  itemsQty: order.orderItems.length,
                  amount: order.totalPrice,
                  status: order.orderStatus,
            })
      })
      return (
            <Fragment>
                  <MetaData title="Admin-All Orders" />
                  <div className="adminAllOrders">
                        <SideBar />
                        <div className="ordersListContainer">
                              <h1 id="ordersListHeading">ALL Orders</h1>

                              <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={10}
                                    disableSelectionOnClick
                                    className="ordersListTable"
                                    autoHeight
                              />
                        </div>
                  </div>
            </Fragment>
      )
};

export default AdminOrders;
