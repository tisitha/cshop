import React, { useState } from 'react';
import { Footer } from './';
import logosb from "./assets/logosmallblack.png";
import "./login.css";
import axios from 'axios';

const ForgotPass1 = () => {

  const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const hideMessage = ()=>{
    setMessage('');
  }

  const handleResetPassEmail = async (e) => {

    setLoading(true);
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const email = formData.get('email');

    try {
      await axios.post(`${baseURL}/api/auth/verifymail/${email}`);
      setMessage("");
      window.location.href = `/enterotp/${email}`;
    }
    catch (error) {
      console.error(error);
      if(error.response.status===404){
        setMessage("Address not found");
      }
    }
    finally {
      setLoading(false);
    }
  }
  return (
    <>
      <div className='divlogin'>
        <img src={logosb} />
        <h3 className='logintitle'>Reset Your Password</h3>
        <form className='loginForm' onSubmit={handleResetPassEmail}>
          <p>Please enter your email address to search for your account</p>
          <input className='input-style' type='text' name='email' autoComplete='email' placeholder='Email' required />
          <button className='loginbtn' disabled={loading} type='submit' onFocus={hideMessage}>{loading ? 'sending...' : 'send OTP'}</button>
          <div className='regErrorMsg'>{message}</div>
        </form>
        <div className='logintext' onClick={(e) => { window.location.href = '/login'; }}>Cancel</div>
      </div>
      <Footer />
    </>
  )
}

export default ForgotPass1