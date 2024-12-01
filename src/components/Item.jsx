import React,{useEffect,useState} from 'react';
import axios from 'axios';
import "./item.css";
import { Navbar, Navbottom,Footer } from './';
import { useParams } from 'react-router-dom';

const Item = () => {

    const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

    const token = localStorage.getItem('token');
    const cid = localStorage.getItem('cid');

    const [loading, setLoading] = useState(false);
    const [product,setProduct] = useState({});
    const [count, setCount] = useState(1);

    const {id} = useParams();

    const getProduct = async()=>{
        try{
            const response = await axios.get(`${baseURL}/api/product?id=${id}`);
            setProduct(response.data);
        }
        catch(error){
            console.error(error);
        }
    }

    const addToCart = async () => {

        const cartdata = {
          "quantity": count,
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

    const increment = () => {
        setCount(count + 1);
      };
    
    const decrement = () => {
        if(count>1){
            setCount(count - 1);
        }   
      };

    const handleChange = (e) =>{
        e.preventdefault;
        if (e.target.value>=0){
            setCount(e.target.value);
        }
    }

    useEffect(()=>{getProduct();},[]);

    return (
        <>
        <Navbar/>
        <Navbottom/>
        <div className='itemPanel'>
            {Object.keys(product).length !== 0 && (<><div className='imgpart'>
                <img src={product.imgUrl} />
            </div>
            <div className='detailspart'>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                {product.deal > 0 ? (<div><span className="priceTagOld">Rs.{product.price}</span><span className="priceTagNew">Rs.{product.deal}</span></div>) : (<span className="priceTag2">Rs.{product.price}</span>)}
                <div className='changeCount'>
                    <div className='ccbtn' onClick={decrement}>-</div>
                    <input id='cc' className='cc' autoComplete='off' onChange={(e)=>handleChange(e)} value={count}></input>
                    <div className='ccbtn' onClick={increment}>+</div>
                    <div className='itempanelcartAddBtn' onClick={cid?addToCart:()=>alert("You must log in to continue")}>{loading?"Adding":"Add to cart"}</div>
                </div>
            </div></>)}
        </div>
        <Footer/>
        </>
    )
}

export default Item