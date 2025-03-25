// filepath: /c:/Users/User-10/Documents/react tutorial/food del/frontend/src/pages/PlaceOrder/PlaceOrder.jsx
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Componenets/Context/StroreContext'
import './PlaceOrder.css'
import axios from 'axios'

function PlaceOrder() {
  const navigate = useNavigate()
  const {getTotalCartAmount, token, item_list, cartItems, url} = useContext(StoreContext)
  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData(prev => ({...prev, [name]: value}))
  }

  const placeOrder = async(event) => {
    event.preventDefault()
    
    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.street || 
        !data.city || !data.zipCode || !data.country || !data.phone) {
      alert('Please fill in all required fields')
      return
    }

    try {
      let orderItems = []
      item_list.forEach((item) => {
        if(cartItems[item._id] > 0) {
          let itemInfo = {
            ...item,
            quantity: cartItems[item._id]
          }
          orderItems.push(itemInfo)
        }
      })

      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + 2,
      }

      let response = await axios.post(
        `${url}/api/order/place`, 
        orderData, 
        { 
          headers: { token: token }  // Fix: Changed from {header:token} to {headers: {token}}
        }
      )

      if(response.data.success) {
        const {session_url} = response.data
        window.location.replace(session_url)
      } else {
        alert("Failed to place order")
      }
    } catch (error) {
      console.error('Error placing order:', error)
      alert("Error placing order. Please try again.")
    }
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input 
            required 
            name="firstName" 
            onChange={onChangeHandler} 
            value={data.firstName}
            type="text" 
            placeholder='First Name:'
          />
          <input 
            required 
            name="lastName" 
            onChange={onChangeHandler} 
            value={data.lastName}
            type="text" 
            placeholder='Last Name:' 
          />
        </div>
        <input required  type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Email Adress:' />
        <input required  name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className='multi-fields'>
          <input required  name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='city'/>
          <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className='multi-fields'>
          <input 
            required 
            name="zipCode" 
            onChange={onChangeHandler} 
            value={data.zipCode}
            type="text" 
            placeholder='Zip Code:'
          />
          <input  required name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country:' />
        </div>
        <input required  name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />

      </div>
      <div className="place-order-right">
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
        <button type="submit">
          PROCEED TO PAYMENT
        </button>
      </div>

      </div>
    </form>
  )
}

export default PlaceOrder