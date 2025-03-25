import React, { useState, useContext } from 'react';
import './Item.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../Context/StroreContext';

function Item({ _id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  // Check if the required props are provided
  if (!_id || !name || !price || !description || !image) {
    return <div>Loading...</div>;
  }

  return (
    <div className='item'>
      <div className="item-img-container">
        <img className="item-image" src={url + "/images/" + image} alt="" />
        {cartItems && cartItems[_id] > 0 ? (
          <div className='item-counter'>
            <img onClick={() => removeFromCart(_id)} src={assets.remove_icon_red} alt="Remove" />
            <p>{cartItems[_id]}</p>
            <img onClick={() => addToCart(_id)} src={assets.add_icon_green} alt="Add" />
          </div>
        ) : (
          <img className='add' onClick={() => addToCart(_id)} src={assets.add_icon_white} alt="Add" />
        )}
      </div>
      <div className="item-info">
        <div className="item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_stars} alt="Rating" />
        </div>
      </div>
      <p className="item-description">{description}</p>
      <p className="item-price">Rs.{price}</p>
    </div>
  );
}

export default Item;