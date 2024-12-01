import React, { useState } from 'react';
import {Footer } from './';
import logosb from "./assets/logosmallblack.png";
import "./login.css";
import axios from 'axios';

const Login = () => {

  const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const [message,setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const hideMessage = ()=>{
    setMessage('');
  }

  const handleLogin = async(e)=>{

      setLoading(true);
      e.preventDefault();

      const expiryTime = new Date().getTime() + 1000*60*60 - 5000;
      localStorage.setItem('tokenExpiry', expiryTime);

      const form = e.target;
      const formData = new FormData(form);
      
      const formToJson = (formData) => {
        const jsonData = {};
        formData.forEach((value, key) => {
          jsonData[key] = value;
        });
        return jsonData;
      }
  
      const loginData = formToJson(formData);

      try{
        const response = await axios.post(`${baseURL}/api/auth/login`,loginData);
        if(response.status==200){
          const data = await response.data;
          localStorage.setItem('token', data.token);
          localStorage.setItem('cid', data.cid);
          localStorage.setItem('firstname', data.firstname);
          setMessage("");
          window.location.href='/';
        }
      }
      catch(error){
        if(error.response.status==401){
          setMessage('Invalid username or password');
        }
        console.error(error);
      }
      finally{
        setLoading(false);
      }
  }

  return (
    <>
    <div className='divlogin'>
    <img src={logosb}/>
    <h3 className='logintitle'>Login</h3>
    <form  className='loginForm' onSubmit={handleLogin}>
      <input className='input-style' type='email' name='email' autoComplete='email' placeholder='Email' onFocus={hideMessage} required/>
      <input  className='input-style' type='password' name='password' placeholder='Password' onFocus={hideMessage} required/>
      <button className='loginbtn' type='submit' disabled={loading}>{loading ? '...' : 'login'}</button>
      <div className='errorMsg'>{message}</div>
    </form>
    <div className='logintext' onClick={(e)=>{window.location.href='/forgotpass';}}>Forgotten password?</div>
    <div className='logintext' onClick={(e)=>{window.location.href='/register';}}>Create account</div>
    <div className='logintext' onClick={(e) => { window.location.href = '/'; }}>Cancel</div>
    </div>
    <Footer/>
    </>
  )
}

export default Login