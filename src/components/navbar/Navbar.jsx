import React, { useState, useEffect } from "react";
import { CheckTokenExpiry } from '../';
import "./navbar.css";
import menu from "./Images/menu.svg";
import logo from "./Images/logo.png";
import searchIcon from "./Images/search_icon.svg";
import account from "./Images/account.png";
import cart from "./Images/cart.png";
import axios from "axios";

function Navbar() {

    const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

    const [toggleM, setToggleM] = useState(false);

    const [toggleSearchContent, setToggleSearchContent] = useState(false);

    const [searchProducts, setSearchProduct] = useState({});

    const [searchName, setSearchName] = useState("");

    const firstname = localStorage.getItem('firstname');

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => CheckTokenExpiry());

    const getSearchProducts = async () => {
        if (searchName.trim().length > 0) {
            try {
                const response = await axios.get(`${baseURL}/api/product/search?item=${searchName}`);
                setSearchProduct(response.data.slice(0, 10));
            } catch (error) {
                console.error(error);
            }
        }
        else {
            setSearchProduct({});
        }
    }

    const handleInputChange = (e) => {
        setSearchName(e.target.value);
    }

    useEffect(() => { getSearchProducts(); }, [searchName]);

    const toggleMHandle = () => {
        setToggleM(!toggleM);
    }

    const checkFocus = () => {
        setToggleSearchContent(true);
    }

    const checkBlur = () => {
        setTimeout(() => {
            setToggleSearchContent(false);;
        }, 300);
    }

    return (<>
        {toggleM ? (<div className="dropdown-content">
            <div className="left">
                <a href="/category-desktops" draggable="false">Desktops</a>
                <a href="/category-laptops" draggable="false">Laptops</a>
                <a href="/category-cpus" draggable="false">CPUs</a>
                <a href="/category-gpus" draggable="false">GPUs</a>
                <a href="/category-motherboards" draggable="false">Motherboards</a>
                <a href="/category-rams" draggable="false">RAMs</a>
                <a href="/category-storages" draggable="false">HDD/SSDs</a>
                <a href="/category-psus" draggable="false">Power Supplies</a>
                <a href="/category-cases" draggable="false">Cases</a>
                <a href="/category-coolings" draggable="false">Coolings</a>
                <a href="/category-peripherals" draggable="false">Peripherals</a>
                <a href="/category-softwares" draggable="false">Softwares</a>
                <a href="/category-networkings" draggable="false">Networking</a>
                <a href="/service" draggable="false">Services</a>
            </div>
            <div className="right" onClick={toggleMHandle}>
            {isMobile&&<div className="closeMenuBtn">✖</div>}
            </div>
        </div>) : (<div></div>)}

        <nav>
            <div>
                <img src={menu} onClick={toggleMHandle} draggable="false" className="menu" alt="Menu" />
            </div>
            <a><img className="logo" draggable="false" src={logo} alt="Home Page" onClick={(e) => { window.location.href = '/'; }} /></a>
            <div className="search">
                <div className="innerSearch">
                    <input type="text" name="searchBar" onChange={handleInputChange} value={searchName} onFocus={checkFocus} onBlur={checkBlur} className="search_input" autoComplete='off' placeholder="Search" />
                    <img draggable="false" onClick={(e)=>{window.location.href = `/searchresult/${searchName}`;}} src={searchIcon} className="search_icon" alt="" />
                </div>

                <div>
                    <div className="searchContent">
                        {(searchProducts.length > 0 && toggleSearchContent) && (
                            searchProducts.map((searchProduct, i) => (
                                <div onClick={(e) => { window.location.href = `/item/${searchProduct.id}`; }} key={i}>{searchProduct.name}</div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div className="space"></div>
            {firstname ?
                (<div className="account" onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('cid');
                    localStorage.removeItem('firstname');
                    window.location.reload();
                }}>
                    <img draggable="false" src={account} />Hello {firstname}|Logout</div>) :
                (<div className="account" onClick={(e) => { window.location.href = '/login'; }}><img draggable="false" src={account} />Hello, Sign in</div>)
            }
            <div className="cart" onClick={(e) => { window.location.href = '/cart'; }}><img draggable="false" src={cart} alt="" />Cart</div>
        </nav>
    </>
    )
}

export default Navbar;