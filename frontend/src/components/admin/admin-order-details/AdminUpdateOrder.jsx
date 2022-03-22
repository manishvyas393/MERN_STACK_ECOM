import React, { Fragment,useState,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import MetaData from "../../layout/MetaData"
import { Link,useParams } from "react-router-dom"
import { Typography } from "@material-ui/core";
import Loader from '../../layout/loader/Loader'
import SideBar from '../sidebar/SideBar'
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { clearErrors, GetUserOrderDetails } from '../../../actions/orderAction'
import "./adminorderdetails.css"
import { adminUpdateOrderAction } from '../../../actions/adminAllOrdersAction'
import { ADMIN_UPDATE_ORDER_RESET } from '../../../constants/adminOrderConstants'
export const AdminUpdateOrder = () => {
      const {id}=useParams()
      const { loading, error, orderDetails } = useSelector(state => state.userOrderDetails)
      const { isUpdated} = useSelector(state => state.adminUpdateOrder)
      const updateOrderSubmitHandler = (e) => {
            e.preventDefault();
            const myForm = new FormData();
            myForm.set("status", status);
            dispatch(adminUpdateOrderAction(id,myForm))
      };

      const dispatch = useDispatch();
      const alert = useAlert();
      const [status, setStatus] = useState("");
      useEffect(() => {
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors())
            }
            if (isUpdated) {
                  alert.success("Status Updated")
                  dispatch({type:ADMIN_UPDATE_ORDER_RESET})
            }
            else {
                  dispatch(GetUserOrderDetails(id))
            }
      }, [dispatch, alert, error, id,isUpdated])
      return (
            <Fragment>
                  <MetaData title="Process Order" />
                  <div className="orderDetailContainer">
                        <SideBar />
                        <div className="orderBox">
                              {loading ? (
                                    <Loader />
                              ) : (
                                    <div
                                          className="OrderDetailPage"
                                          style={{
                                                display: orderDetails.orderStatus === "Delivered" ? "block" : "flex",
                                          }}
                                    >
                                          <div>
                                                <div className="confirmshippingArea">
                                                      <Typography>Shipping Info</Typography>
                                                      <div className="orderDetailsContainerBox">
                                                            <div>
                                                                  <p>Name:</p>
                                                                  <span>{orderDetails.user && orderDetails.user.name}</span>
                                                            </div>
                                                            <div>
                                                                  <p>Phone:</p>
                                                                  <span>
                                                                        {orderDetails.shippingInfo && orderDetails.shippingInfo.phoneNo}
                                                                  </span>
                                                            </div>
                                                            <div>
                                                                  <p>Address:</p>
                                                                  <span>
                                                                        {orderDetails.shippingInfo &&
                                                                              `${orderDetails.shippingInfo.address}, ${orderDetails.shippingInfo.city}, ${orderDetails.shippingInfo.state}, ${orderDetails.shippingInfo.pinCode}, ${orderDetails.shippingInfo.country}`}
                                                                  </span>
                                                            </div>
                                                      </div>

                                                      <Typography>Payment</Typography>
                                                      <div className="orderDetailsContainerBox">
                                                            <div>
                                                                  <p
                                                                        className={
                                                                             orderDetails.paymentInfo &&
                                                                                   orderDetails.paymentInfo.status === "succeeded"
                                                                                    ? "greenColor"
                                                                                    : "redColor"
                                                                        }
                                                                  >
                                                                        {orderDetails.paymentInfo &&
                                                                             orderDetails.paymentInfo.status === "succeeded"
                                                                              ? "PAID"
                                                                              : "NOT PAID"}
                                                                  </p>
                                                            </div>

                                                            <div>
                                                                  <p>Amount:</p>
                                                                  <span>{orderDetails.totalPrice &&orderDetails.totalPrice}</span>
                                                            </div>
                                                      </div>

                                                      <Typography>Order Status</Typography>
                                                      <div className="orderDetailsContainerBox">
                                                            <div>
                                                                  <p
                                                                        className={
                                                                             orderDetails.orderStatus &&orderDetails.orderStatus === "Delivered"
                                                                                    ? "greenColor"
                                                                                    : "redColor"
                                                                        }
                                                                  >
                                                                        {orderDetails.orderStatus &&orderDetails.orderStatus}
                                                                  </p>
                                                            </div>
                                                      </div>
                                                </div>
                                                <div className="confirmCartItems">
                                                      <Typography>Your Cart Items:</Typography>
                                                            <div className="orderDetailsCartItemsContainer">
                                                            {orderDetails.orderItems &&
                                                                 orderDetails.orderItems.map((item) => (
                                                                        <div key={item.product}>
                                                                              <img src={item.image} alt="Product" />
                                                                              <Link to={`/product/${item.product}`}>
                                                                                    {item.name}
                                                                              </Link>{" "}
                                                                              <span>
                                                                                    {item.quantity} X ₹{item.price} ={" "}
                                                                                    <b>₹{item.price * item.quantity}</b>
                                                                              </span>
                                                                        </div>
                                                                  ))}
                                                      </div>
                                                </div>
                                          </div>
                                          {/*  */}
                                          <div
                                                style={{
                                                      display:orderDetails.orderStatus === "Delivered" ? "none" : "block",
                                                }}
                                          >
                                                <form
                                                      className="updateOrderForm"
                                                      onSubmit={updateOrderSubmitHandler}
                                                >
                                                      <h1>Process Order</h1>

                                                      <div>
                                                            <AccountTreeIcon />
                                                            <select onChange={(e) => setStatus(e.target.value)}>
                                                                  <option value="">Choose Category</option>
                                                                  {orderDetails.orderStatus === "Processing" && (
                                                                        <option value="Shipped">Shipped</option>
                                                                  )}

                                                                  {orderDetails.orderStatus === "Shipped" && (
                                                                        <option value="Delivered">Delivered</option>
                                                                  )}
                                                            </select>
                                                      </div>

                                                      <Button
                                                            id="createProductBtn"
                                                            type="submit"
                                                            disabled={
                                                                  loading ? true : false || status === "" ? true : false
                                                            }
                                                      >
                                                            Process
                                                      </Button>
                                                </form>
                                          </div>
                                    </div>
                              )}
                        </div>
                  </div>
            </Fragment>
      );
};


