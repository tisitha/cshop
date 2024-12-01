import React, { useEffect, useState } from "react";
import "./items.css";
import axios from 'axios';
import { Navbar, Navbottom, ProductCard,Footer } from './';
import { useParams } from 'react-router-dom';

const SearchResult = () => {

  const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const {searchname} = useParams();

  const [products, setProducts] = useState([]);

  const getSearchProducts = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/product/search?item=${searchname}`);
            setProducts(response.data.slice(0, 30));
        } catch (error) {
            console.error(error);
        }
    }

  useEffect(() => {
    getSearchProducts();
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

export default SearchResult