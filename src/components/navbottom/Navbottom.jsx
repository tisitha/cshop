import React from "react";
import "./navbottom.css";

function Navbottom(){

    return(
        <div className="nav_bottom"> 
        <h1 onClick={(e)=>{window.location.href='/deals';}}>Today's Deals</h1>
        <h1 onClick={(e)=>{window.location.href='/service';}}>Services</h1>
        <h1 onClick={(e)=>{window.location.href='/help';}}>Help Center</h1>
    </div>
    )
}

export default Navbottom;