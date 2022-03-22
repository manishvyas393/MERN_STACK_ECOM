import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addItemsToCart, deleteItemFromCart } from '../../actions/cartAction'
import MetaData from "../layout/MetaData"
import "./cart.css"
import CartItemCard from "./cart-item-card/CartItemCard"
import { RemoveShoppingCart} from '@material-ui/icons'
import { Typography } from '@material-ui/core'
import { Link, useNavigate } from 'react-router-dom'
const Cart = () => {
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const { cartItems } = useSelector(state => state.cart)
      const increaseQuantity = (id, quantity, stock) => {
            const newQty = quantity + 1;
            if (stock <= quantity) {
                  return;
            }
            dispatch(addItemsToCart(id, newQty));
      };
      const decreaseQuantity = (id, quantity) => {
            const newQty = quantity - 1;
            if (1 >= quantity) {
                  return;
            }
            dispatch(addItemsToCart(id, newQty));
      };
      const deleteItemsFromCart = (id) => {
            dispatch(deleteItemFromCart(id));
      };
      const checkOut = () => {
            navigate("/shipping")
      }
      return (
            <Fragment>
                  {
                        cartItems.length === 0 ?
                              (<div className='NoItems'>
                                    <RemoveShoppingCart />
                                    <Typography>No Product In Your Cart</Typography>
                                    <Link to="/products">View Products</Link>

                              </div>) : (

                                    <Fragment>
                                          <MetaData title="Cart" />
                                          <div className="CartPage" >
                                                <div className="CartHeader">
                                                      <p>Product</p>
                                                      <p>Quantity</p>
                                                      <p>SubTotal</p>
                                                </div>
                                                {
                                                      cartItems.map((item) => (
                                                            <Fragment key={item.name}>
                                                                  <div className="CartItemContainer" key={item.product}>
                                                                        <CartItemCard item={item} deleteCartItems={deleteItemsFromCart} />
                                                                        <div className="CartInput">
                                                                              <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                                                              <input type="number" value={item.quantity} readOnly />
                                                                              <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                                                        </div>
                                                                        <p className="SubTotal">&#8377;{item.quantity * item.price}</p>
                                                                  </div>

                                                            </Fragment>


                                                      ))

                                                }
                                                <div className="TotalAmount">
                                                      <div></div>
                                                      <div className="TotalAmountBox">
                                                            <p>Total Amount:</p>
                                                            <p>{`₹${cartItems.reduce(
                                                                  (acc, item) => acc + item.quantity * item.price,
                                                                  0
                                                            )}`}</p>
                                                      </div>
                                                      <div></div>
                                                      <div className="CheckOutBtn">
                                                            <button onClick={checkOut}>Check Out</button>
                                                      </div>
                                                </div>

                                          </div>
                                    </Fragment>
                              )

                  }
            </Fragment>
      )
}

export default Cart
