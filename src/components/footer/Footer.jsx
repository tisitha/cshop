import React from 'react';
import "./footer.css";
import logo from "./images/logo.png";
import fb from "./images/fb.png";
import insta from "./images/insta.png";
import ln from "./images/in.png";
import x from "./images/x.png";
import yb from "./images/youtube.png";
import axios from 'axios';
import axiosRetry from 'axios-retry';


const Footer = () => {

  axiosRetry(axios, {
    retries: 5,
    retryDelay: (retryCount) => {
        console.log(`Retry attempt #${retryCount}`);
        return retryCount * 1000;
    },
    retryCondition: (error) => {
        return axiosRetry.isNetworkError(error) || error.response?.status >= 500;
    },
});

    const currentYear = new Date().getFullYear();
  return (
    <div className="end">
        <div>
            <img src={logo} className="endLogo"  onClick={(e)=>{window.location.href='/';}}/>
            <h3>©{currentYear}. All Rights Reserved</h3>
        </div>
        <div className="social">
            <a href='https://www.facebook.com'>
            <img draggable="false" src={fb} className="socialIcons"/>
            </a>
            <a href='https://www.instagram.com'>
            <img draggable="false" src={insta}  className="socialIcons"/>
            </a>
            <a href='https://www.linkedin.com'>
            <img draggable="false" src={ln}  className="socialIcons"/> 
            </a>
            <a href='https://x.com'>
            <img draggable="false" src={x}  className="socialIcons"/>
            </a>
            <a href='https://www.youtube.com'>
            <img draggable="false" src={yb}  className="socialIcons"/>
            </a>  
        </div>
    </div>
  )
}

export default Footer