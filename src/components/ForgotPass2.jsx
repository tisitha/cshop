import React,{useState} from 'react';
import {Footer } from './';
import logosb from "./assets/logosmallblack.png";
import "./login.css";
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ForgotPass2 = () => {

  const {email} = useParams();
  const [loading, setLoading] = useState(false);

  const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const [message,setMessage] = useState('');

  const hideMessage = ()=>{
    setMessage('');
  }

  const handleResetPassOtp = async(e)=>{
    setLoading(true);
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const otp = formData.get('otp');

    try{
      const response = await axios.post(`${baseURL}/api/auth/varifyotp/${otp}/${email}`);
      if(response.status==200){
        setMessage("");
        window.location.href=`/resetpass/${otp}/${email}`;
      }
    }
    catch(error){
      console.error(error);
      if(error.response.status===408){
        setMessage("Otp expired");
      }
      if(error.response.status===500){
        setMessage("Invalid request");
      }
    }
    finally {
      setLoading(false);
    }
  }
    return (
        <>
        <div className='divlogin'>
        <img src={logosb}/>
        <h3 className='logintitle'>Reset Your Password</h3>
        <form  className='loginForm' onSubmit={handleResetPassOtp}>
            <p>Enter your OTP</p>
          <input className='input-style' type='text' name='otp' autoComplete='off' placeholder='OTP' onFocus={hideMessage} required/>
          <button className='loginbtn' type='submit' disabled={loading}>{loading ? 'vertifing...' : 'vertify OTP'}</button>
          <div className='regErrorMsg'>{message}</div>
        </form>
        <div className='logintext' onClick={(e) => { window.location.href = '/forgotpass'; }}>Resend OTP?</div>
        <div className='logintext' onClick={(e) => { window.location.href = '/login'; }}>Cancel</div>
        </div>
        <Footer/>
        </>
      )
}

export default ForgotPass2