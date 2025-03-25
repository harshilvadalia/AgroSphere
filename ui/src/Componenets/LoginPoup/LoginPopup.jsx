import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../Context/StroreContext';
import axios from 'axios';

function LoginPopup({setShowLogin}) {
  const [currState,setCurrState]=useState("Login")
  const[data,setData]=useState({name:"",email:"",password:""})

  const{url,token,setToken}=useContext(StoreContext);

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }
  
  const onLogin=async(event)=>{
    event.preventDefault();
    let newUrl=url;
    if(currState==="Login"){
      newUrl+="/api/user/login";
    }
    else{
      newUrl+="/api/user/register";
    }
    const response=await axios.post(newUrl,data);
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false);
    }
    else{
      alert(response.data.message);
    }


  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div> 
        <div className="login-popup-input">
          {currState==="Login"?<></>:<input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder='Your name' required></input>}
          <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Your email' required></input>
          <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder='Your password' required></input>
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required></input>
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState==="Login"? <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>:<p>Already have an account?<span onClick={()=>setCurrState("Login")}>Login Here</span></p>}
      </form>
      
    </div>
  )
}

export default LoginPopup