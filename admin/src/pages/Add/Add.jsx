import React,{useState} from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

function Add({url}) {
    const [image, setImage] = useState(false);
    const[data,setData]=useState({
        name:"",
        description:"",
        category:"Seed and Saplings",
        price:""
    })
    const onChangeHandler=(event)=>{
       const name=event.target.name;
       const value=event.target.value;
       setData(data=>({...data,[name]:value}))

    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category", data.category);
    
        // Ensure price is a number
        const priceValue = parseFloat(data.price);
        if (isNaN(priceValue)) {
            alert("Please enter a valid price.");
            return; // Stop form submission
        }
        formData.append("price", priceValue);
    
        formData.append("image", image);
    
        console.log("Sending Form Data:", Object.fromEntries(formData.entries())); // Debugging
    
        try {
            const response = await axios.post(`${url}/api/products/add`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            console.log("Response Data:", response.data); // Debugging
    
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    category: "Seed and Saplings",
                    price: "",
                });
                setImage(null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Axios Error:", error.response ? error.response.data : error);
            alert("Error adding product. Check console for details.");
        }
    };
    


   
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area}></img>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Seeds and Saplings">Seeds and Saplings</option>
              <option value="Farming tools">Farming tools</option>
              <option value="Fertilizer">Fertilizer</option>
              <option value="Millets">Millets</option>
              <option value="Fresh Fruits and Vegetables">
                Fresh Fruits and Vegetables
              </option>
              <option value="Honey and Dairy products">
                Honey and Dairy products
              </option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="text" name="price" placeholder="Rs.20" />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
}

export default Add;
