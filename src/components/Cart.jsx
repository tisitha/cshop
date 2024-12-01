import React, { useEffect, useState } from 'react';
import { Navbar, Navbottom, Footer } from './';
import "./cart.css";
import axios from 'axios';

const Cart = () => {

    const baseUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

    const token = localStorage.getItem('token');
    const cid = localStorage.getItem('cid');

    const [cart, setCart] = useState([]);
    let quantityInputTimeout = null;

    const getCart = async () => {
        try {
            const response = await axios.get(`${baseUrl}/api/cart?cid=${cid}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            const data = await response.data;
            setCart(data);

        }
        catch (error) {
            if (error.response?.status === 500) {
                return axios.request(error.config);
            }
            return Promise.reject(error);
        }
    }

    const handleDeleteCart = async (id) => {
        try {
            const response = await axios.delete(`${baseUrl}/api/cart/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if(response.status===200){
                const newCart = cart.filter((cartItem) => id !== cartItem.id);
                setCart(newCart);
            }
        }
        catch (error) {
            if (error.response?.status === 500) {
                return axios.request(error.config);
            }
            return Promise.reject(error);
        }
    }

    useEffect(() => { getCart() }, []);

    const sum = () => {
        return cart.reduce((total, item) => total + (item.deal>0?item.deal:item.price) * item.quantity, 0);
    }

    const handleIncrement = (oldValue, item,i) =>{
        const newValue = item.quantity+oldValue;
        updateQuantity(newValue, item,i);
    }

    const handleChange = (oldValue, item,i) =>{
        const newValue = oldValue.target.value;
        updateQuantity(newValue, item,i);
    }

    const updateQuantity = (newValue, item,i) => {

        clearTimeout(quantityInputTimeout);

        if (newValue >= 0) {
            setCart(prevCart =>
                prevCart.map((cartItem, index) =>
                    index === i ? { ...cartItem, "quantity": newValue } : cartItem
                )
            );
            quantityInputTimeout = setTimeout(async () => {
            try {
                axios.put(`${baseUrl}/api/cart/${item.id}`, { "quantity":newValue }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                
            }
            catch (error) {
                if (error.response?.status === 500) {
                    return axios.request(error.config);
                }
                return Promise.reject(error);
            }
        }, 500);
    }
}
    return (
        <>
            <Navbar />
            <Navbottom />
            {token ?
                <div className='cartPanel'>{cart.length > 0 ? <div className='cartCardList'>
                    {cart.map((item, i) => (<div className='cartCard' key={i}>
                        <div className='cartImgPart'>
                            <div><img src={item.imgUrl} /></div>
                            <div>
                                <div className='nameOcart'>{item.title}</div>
                                <b>category: {item.category}</b>
                            </div>
                        </div>
                        <div className='cartSumPart'>
                            <div>Rs. {item.deal>0?(item.deal):(item.price)}</div>
                            <div className='cartQuantityPanel'>
                                <div className='ccbtn' onClick={(e) => handleIncrement(-1, item,i)}>-</div>
                                <input type='number' name='quantity' className='cartQuantity' autoComplete='off' onChange={(e) => handleChange(e, item,i)} value={item.quantity}></input>
                                <div className='ccbtn' onClick={(e) => handleIncrement(+1, item,i)}>+</div>
                            </div>
                            <div>Rs.{item.quantity * (item.deal>0?item.deal:item.price)}</div>
                            <button className='deleteBtn' onClick={() => handleDeleteCart(item.id)}>✖</button>
                        </div>
                    </div>))}
                    <div className='total'><div className='totaltext'>Total&nbsp;</div><div className='totalsum'>Rs.{sum()}</div></div>
                    <div className='checkoutbtn'><button className='loginbtn'>Check out</button></div>
                </div> :
                    <div className='cartPanel2'>Your shopping cart is empty</div>}
                </div> :
                <div className='cartPanel2'><button className='loginbtn' onClick={(e) => { window.location.href = '/login'; }}>Sign in to your account</button><button className='loginbtn' onClick={(e) => { window.location.href = '/register'; }}>Sign up now</button></div>}
            <Footer />
        </>
    )
}

export default Cart