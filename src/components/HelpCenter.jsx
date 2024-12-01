import React from 'react';
import { Navbar, Navbottom,Footer } from './';

const HelpCenter = () => {
  return (
    <>
    <Navbar/>
    <Navbottom/>
    <div className='serviceDiv'> <h2>Help Center</h2>
        <p>Find answers to common questions or contact our support team for assistance.</p>
        
        <div class="serviceIndiv">
            <h3>● What is the warranty period for repairs?</h3>
            <p>We offer a 90-day warranty for all repairs performed at our shop and 1-year for brand new products. This covers any issues directly related to the repair.</p>
        </div>

        <div class="serviceIndiv">
            <h3>● Can I track the status of my repair?</h3>
            <p>Yes, you can track the status of your repair by contacting us with your repair ID. We'll provide you with updates.</p>
        </div>

        <div class="serviceIndiv">
            <h3>● Do you offer home services?</h3>
            <p>Yes, we provide home services for network setup, troubleshooting, and basic repairs within a 5-km radius.</p>
        </div>

        <div class="serviceIndiv">
            <h3>● How can I contact support?</h3>
            <p>You can contact our support team via email at support@circutverse.com or call us at (123) 456-7890 during business hours.</p>
        </div>

        <div class="serviceIndiv">
            <h3>● What payment methods do you accept?</h3>
            <p>We accept cash, credit/debit cards, and mobile payment options such as Google Pay and Apple Pay.</p>
        </div></div>
    <Footer/>
    </>
    
  )
}

export default HelpCenter