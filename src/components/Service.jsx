import React from 'react';
import { Navbar, Navbottom,Footer } from './';
import "./service.css";

const Service = () => {
  return (
    <>
    <Navbar/>
    <Navbottom/>
    <div className='serviceDiv'>
    <h2>Our Services</h2>
        <p>We offer a wide range of services to keep your devices running smoothly:</p>
        
        <div class="serviceIndiv">
            <h3>● Computer Repair</h3>
            <p>From hardware to software issues, we diagnose and repair all kinds of computer problems.</p>
        </div>

        <div class="serviceIndiv">
            <h3>● Custom PC Builds</h3>
            <p>Want a custom-built PC? We help you choose the best components and assemble them for peak performance.</p>
        </div>

        <div class="serviceIndiv">
            <h3>● Data Recovery</h3>
            <p>Lost important files? We specialize in recovering data from damaged drives and devices.</p>
        </div>

        <div class="serviceIndiv">
            <h3>● Virus & Malware Removal</h3>
            <p>We clean and secure your computer to protect it from harmful viruses and malware.</p>
        </div>

        <div class="serviceIndiv">
            <h3>● Network Setup & Troubleshooting</h3>
            <p>Whether it's home or office, we set up and troubleshoot wired or wireless networks.</p>
        </div>
    </div>
    <Footer/>
    </>
    
  )
}

export default Service