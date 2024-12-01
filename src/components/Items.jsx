import React, { useEffect, useState } from "react";
import "./items.css";
import axios from 'axios';
import { Navbar, Navbottom, ProductCard,Footer } from './';

const Items = ({cate}) => {

  const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const [products, setProduct] = useState({});

  const getProducts = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/product/category=${cate}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
    <Navbar/>
    <Navbottom/>
    <div className="grid-container">
      {products.length > 0 &&
        (products.map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>)
        ))}
    </div>
    <Footer/>
    </>
  )
}

export default Items