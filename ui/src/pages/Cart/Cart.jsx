import React, { useContext } from 'react'
import './Cart.css'
import {StoreContext} from './../../Componenets/Context/StroreContext'
import { useNavigate } from 'react-router';

function Cart() {
  const{cartItems,item_list,removeFromCart,getTotalCartAmount,url}=useContext(StoreContext);
  const navigate=useNavigate();
  return (
    
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
      </div>
      <br></br>
      <hr></hr>
      {item_list.map((item,index)=>{
        if(cartItems[item._id]>0){
          return(
            <div key={index}>
            <div className='cart-items-title cart-items-item'>
              <img src={url+"/images/"+item.image}></img>
              <p>{item.name}</p> 
              <p>Rs.{item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>Rs.{item.price*cartItems[item._id]}</p>
              <p onClick={()=>removeFromCart(item._id)}className='x'>X</p>
            </div>
            <hr/>
            </div>
          );
        }
        return null;
      })}
  
    <div className="cart-bottom">
      <div className="cart-total">
        <h2>Cart Totals</h2>
        <div>
          <div className="cart_total-details">
            <p>SubTotal</p>
            <p>Rs.{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart_total-details">
            <p>Delivery Fee</p>
            <p>Rs.{2}</p>
          </div>
          <hr />
          <div className="cart_total-details">
            <b>Total:</b>
            <b>Rs.{getTotalCartAmount()+2}</b>
          </div>
        </div>
        <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
      </div>
      <div className="cart-promocode">
        <div>
          <p>If you have promo code, Enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
    </div>


  )
}

export default Cart