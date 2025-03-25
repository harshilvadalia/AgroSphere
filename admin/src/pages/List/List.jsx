import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

function List({url}) {
  const [list, setList] = useState([]);
  
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/products/list`);
      
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching list:', error);
      toast.error('Failed to fetch list');
    }
  };
  const removeproduct=async(productId)=>{
    const response=await axios.post(`${url}/api/products/remove`,{id:productId});
    await fetchList();
    if(response.data.success)
    {
      toast.success(response.data.message);
    }else{
      toast.error("Error");
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>Rs.{item.price}</p>
              <p onClick={()=>removeproduct(item._id)}className='cursor'>X</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;