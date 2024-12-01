import React from 'react';
import {Footer } from './';
import logosb from "./assets/logosmallblack.png";
import "./resetsuccess.css";

const registerSuccess = () => {
  return (
    <>
    <div className='divlogin'>
        <img src={logosb}/>
        <div className='resetform'>
        <h3 className='resettitle'>Account created successfully!</h3>
        <p>Please login to your account</p>
        <button className='resetbtn' onClick={()=>{window.location.href="/login";}}>login now</button>
        </div>
        </div>
        <Footer/>
        </>
  )
}

export default registerSuccess;