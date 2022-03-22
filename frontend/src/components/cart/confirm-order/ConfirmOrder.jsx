import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import CheckOutSteps from "../checkout-steps/CheckOutSteps"
import MetaData from "../../layout/MetaData"
import { Link, useNavigate } from "react-router-dom"
import { Typography } from "@material-ui/core";
import "./confirmorder.css"
export const ConfirmOrder = () => {
      const navigate=useNavigate()
      const { cartItems, shippingInfo } = useSelector(state => state.cart)
      const { user } = useSelector(state => state.user)
      const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state}-${shippingInfo.pinCode},${shippingInfo.country}`
      const subTotal = cartItems.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
      );
      const ShippingCharges = subTotal > 1000 ? 0 : 200;
      const tax = Math.round(subTotal * 0.18)
      const totalPrice = subTotal + tax + ShippingCharges;
      const ProceedToPayment = () => {
            const data = {
                  subTotal,
                  ShippingCharges,
                  tax,
                  totalPrice,
            };

            sessionStorage.setItem("OrderInfo", JSON.stringify(data));
            navigate("/process/payment")

      };

      return (
            <Fragment>
                  <MetaData title="Confirm Order" />
                  <CheckOutSteps activeStep={1} />
                  <div className="ConfirmOrderPage">
                        <div>
                              <div className="ConfirmShippingArea">
                                    <Typography>Shipping Info</Typography>
                                    <div className="ConfirmShippingAreaBox">
                                          <div>
                                                <p>Name:</p>
                                                <span>{user.name}</span>
                                          </div>
                                          <div>
                                                <p>Phone:</p>
                                                <span>{shippingInfo.phoneNo}</span>
                                          </div>
                                          <div>
                                                <p>Address:</p>
                                                <span>{address}</span>
                                          </div>
                                    </div>
                              </div>
                              <div className="ConfirmCartItems">
                                    <Typography>Your Cart Items:</Typography>
                                    <div className="ConfirmCartItemsContainer">
                                          {cartItems &&
                                                cartItems.map((item) => (
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
                        <div>
                              <div className="OrderSummary">
                                    <Typography>Order Summary</Typography>
                                    <div>
                                          <div>
                                                <p>Subtotal:</p>
                                                <span>₹{subTotal}</span>
                                          </div>
                                          <div>
                                                <p>Shipping Charges:</p>
                                                <span>₹{ShippingCharges}</span>
                                          </div>
                                          <div>
                                                <p>GST:</p>
                                                <span>₹{tax}</span>
                                          </div>
                                    </div>

                                    <div className="OrderSummaryTotal">
                                          <p>
                                                <b>Total:</b>
                                          </p>
                                          <span>₹{totalPrice}</span>
                                    </div>

                                    <button onClick={ProceedToPayment}>Proceed To Payment</button>
                              </div>
                        </div>
                  </div>
            </Fragment>
      )
}
