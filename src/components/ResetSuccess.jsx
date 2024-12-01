import React from 'react';
import {Footer } from './';
import logosb from "./assets/logosmallblack.png";
import "./resetsuccess.css";

const ResetSuccess = () => {
  return (
    <>
    <div className='divlogin'>
        <img src={logosb}/>
        <div className='resetform'>
        <h3 className='resettitle'>Password changed successfully!</h3>
        <p>Please login to your account again</p>
        <button className='resetbtn' onClick={()=>{window.location.href="/login";}}>login now</button>
        </div>
        </div>
        <Footer/>
        </>
  )
}

export default ResetSuccess