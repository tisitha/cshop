import React,{useState} from 'react';
import './productCard.css';
import axios from 'axios';

const ProductCard = ({ product }) => {

  const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const token = localStorage.getItem('token');
  const cid = localStorage.getItem('cid');

  const [loading, setLoading] = useState(false);

  const addToCart = async () => {

    const cartdata = {
      "quantity": 1,
      "customerId": cid,
      "productId": product.id
    }
    if (cid) {
      setLoading(true);
      try {
        await axios.post(`${baseURL}/api/cart`, cartdata, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      catch (error) {
        if (error.response?.status === 500) {
          return axios.request(error.config);
        }
        return Promise.reject(error);
      }
      finally{
        (setLoading(false))}
    }
  }

  return (
    <div className='productCard'>
      <div className='imgPanel' onClick={(e) => { window.location.href = `/item/${product.id}`; }}>
        <img src={product.imgUrl} />
      </div>
      <div className='namePanel' onClick={(e) => { window.location.href = `/item/${product.id}`; }}>
        <h3>{product.name}</h3>
      </div>
      {product.deal > 0 ? (<><span className="priceTagOld">Rs.{product.price}</span><span className="priceTagNew">Rs.{product.deal}</span></>) : (<span className="priceTag">Rs.{product.price}</span>)}
      <div className='btnPanel'>
        <div className='cartAddBtn' onClick={cid?addToCart:()=>alert("You must log in to continue")}>{loading?"Adding":"Add to cart"}</div>
      </div>
    </div>
  )
}
export default ProductCard;