import React, { Fragment, useRef, useEffect } from 'react'
import CheckOutSteps from "../checkout-steps/CheckOutSteps";
import { useSelector, useDispatch } from 'react-redux';
import MetaData from "../../layout/MetaData"
import { Typography } from '@material-ui/core';
import { useAlert } from 'react-alert';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"
import CreditCardIcon from "@material-ui/icons/CreditCard"
import EventIcon from "@material-ui/icons/Event"
import VpnKey from "@material-ui/icons/VpnKey"
import { useNavigate } from "react-router-dom"
import "./payment.css"
import { clearErrors, CreateNewOrder } from '../../../actions/orderAction';
const Axios = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true,
      credentials: "include"

})
const Payment = () => {
      const orderInfo = JSON.parse(sessionStorage.getItem("OrderInfo"));

      const dispatch = useDispatch();
      const alert = useAlert();
      const stripe = useStripe();
      const elements = useElements();
      const PayBtn = useRef()
      const navigate = useNavigate()

      const { shippingInfo, cartItems } = useSelector(state => state.cart)
      const { user } = useSelector(state => state.user)
      const { error } = useSelector(state => state.newOrder)
      const paymentData = {
            amount: Math.round(orderInfo.totalPrice * 100),
      };

      const order = {
            shippingInfo,
            orderItems: cartItems,
            itemsPrice: orderInfo.subTotal,
            taxPrice: orderInfo.tax,
            shippingPrice: orderInfo.ShippingCharges,
            totalPrice: orderInfo.totalPrice,
      };

      const submitHandler = async (e) => {
            e.preventDefault();
            PayBtn.current.disabled = true;
            try {
                  const config = {
                        headers: {
                              "Content-Type": "application/json",
                        },
                  };
                  const { data } = await Axios.post("/payment/process", paymentData, config)
                  console.log(data)
                  const client_secret = data.client_secret;
                  if (!stripe || !elements) return;
                  const result = await stripe.confirmCardPayment(client_secret, {
                        payment_method: {
                              card: elements.getElement(CardNumberElement),
                              billing_details: {
                                    name: user.name,
                                    email: user.email,
                                    address: {
                                          line1: shippingInfo.address,
                                          city: shippingInfo.city,
                                          state: shippingInfo.state,
                                          postal_code: shippingInfo.pinCode,
                                          country: shippingInfo.country,
                                    },

                              }
                        }
                        });
                  if (result.error) {
                        PayBtn.current.disabled = false;
                        console.log(result)
                        alert.error(result.error.message);
                  } else {
                        if (result.paymentIntent.status === "succeeded") {
                              order.paymentInfo = {
                                    id: result.paymentIntent.id,
                                    status: result.paymentIntent.status,
                              };

                              dispatch(CreateNewOrder(order));

                              navigate("/success")
                        } else {
                              alert.error("There's some issue while processing payment ");
                        }
                  }


            } catch (error) {
                  PayBtn.current.disabled = false;
                  alert.error(error)

            }
      }
      useEffect(() => {
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors())
            }
      }, [dispatch, error, alert]);
      return (
            <Fragment>
                  <MetaData title="Payment" />
                  <CheckOutSteps activeStep={2} />
                  <div className="PaymentContainer">
                        <form action="" className="PaymentForm" onSubmit={submitHandler}>
                              <Typography>Card Info</Typography>
                              <div>
                                    <CreditCardIcon />
                                    <CardNumberElement className='PaymentInput' />
                              </div>
                              <div>
                                    <EventIcon />
                                    <CardExpiryElement className='PaymentInput' />
                              </div>
                              <div>
                                    <VpnKey />
                                    <CardCvcElement className='PaymentInput' />
                              </div>
                              <input type="submit" value={`Pay-₹${orderInfo.totalPrice}`} ref={PayBtn} name='amount' className='PayBtn' />
                        </form>
                  </div>


            </Fragment>
      )
}

export default Payment
