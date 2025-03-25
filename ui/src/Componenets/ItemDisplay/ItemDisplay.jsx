import React, { useCallback, useContext } from 'react'
import './ItemDisplay.css'
import { StoreContext } from '../Context/StroreContext'
import Item from '../Item/Item'

function ItemDisplay({category}) {
    const {item_list}= useContext(StoreContext)
  return (
    <div className='item-display' _id='item-display'>
        <h2>Top Items for you</h2>
        <div className='item-display-list'>
            {item_list.map((item,index)=>{
              if(category==="All"|| category===item.category){
                return <Item key={index} name={item.name} description={item.description} price={item.price} image={item.image} _id={item._id} />
              }
                
            })}
        </div>
    </div>
  )
}

export default ItemDisplay
