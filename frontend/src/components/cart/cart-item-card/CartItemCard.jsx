import React from 'react'
import { Link } from "react-router-dom";
import "./cartitemcard.css"
const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard" key={item.product} >
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <button onClick={() => deleteCartItems(item.product)}>Delete</button>
      </div>
    </div>
  );
};

export default CartItemCard
