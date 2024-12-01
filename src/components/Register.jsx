import React, { useState } from 'react';
import {Footer } from './';
import logosb from "./assets/logosmallblack.png";
import "./register.css";
import axios from 'axios';

const Register = () => {

  const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const [message,setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const hideMessage = ()=>{
    setMessage('');
  }

  const handleRegister = async(e)=>{

    setLoading(true);
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const formToJson = (formData) =>{
      const jsonData = {};
      formData.forEach((value,key) => {
        jsonData[key]= value;
      });
      return jsonData;
    }

    const registerData = formToJson(formData);

    try{
      const response = await axios.post(`${baseURL}/api/auth/register`,registerData);
      if(response.status==201){
        setMessage("");
        window.location.href="/registersuccess";
      }
    }
    catch(error){
      if(error.response.status==409){
        setMessage("Email has taken");
      }
      console.error(error);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <>
    <div className='divregister'>
    <img src={logosb}/>
    <h3 className='registertitle'>Create a new account</h3>
    <form className='registerForm' onSubmit={handleRegister}>
      
      <label htmlFor="email">Email: </label>
      <input className='registerinput-style' type='email' id='email' name='email' autoComplete='email' onFocus={hideMessage} required/>

      <label htmlFor="firstname">First Name: </label>
      <input className='registerinput-style' type='text' id='firstname' name='firstname' autoComplete='given-name' onFocus={hideMessage} required/>

      <label htmlFor="lastname">Last Name: </label>
      <input className='registerinput-style' type='text' id='lastname' name='lastname' autoComplete='family-name' onFocus={hideMessage} required/>

      <label htmlFor="address1">Address Line1: </label>
      <input className='registerinput-style' type='text' id='address1' name='address1' autoComplete='address-line1' onFocus={hideMessage} required/>

      <label htmlFor="address2">Address Line2: </label>
      <input className='registerinput-style' type='text' id='address2' name='address2' autoComplete='address-line2' onFocus={hideMessage} required/>

      <label htmlFor="phoneNo">Contact No: </label>
      <input className='registerinput-style' type='number' id='phoneNo' name='phoneNo' autoComplete='tel' onFocus={hideMessage} required/>

      <label htmlFor="password">Password: </label>
      <input  className='registerinput-style' type='password' id='password' name='password' onFocus={hideMessage} required/>

      <button className='registerbtn' type='submit' disabled={loading}>{loading ? '...' : 'register'}</button>
      <div className='regErrorMsg'>{message}</div>
    </form>
    <div className='registertext' onClick={(e)=>{window.location.href='/login';}}>Already have an account?</div>
    <div className='logintext' onClick={(e) => { window.location.href = '/'; }}>Cancel</div>
    </div>
    <Footer/>
    </>
  )
}

export default Register