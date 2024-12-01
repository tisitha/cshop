import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';
import axios from 'axios';
import { useState, useEffect } from "react";
import ProductCard from "../productCard/ProductCard";
import './carouselProducts.css'

const CarouselProducts = ({title,api}) => {

  const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

  const [products, setProduct] = useState({});

  const getProducts = async () => {
    try {
      const response = await axios.get(`${baseURL}/api/product/${api}`);
        setProduct((response.data).slice(0, 8));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (<>
    {
      products.length > 0 ? (
        <div className="picks">
          <h2>{title} ▼</h2>
          <div className="row">
            <Swiper className="swipeBtns"
              slidesPerView="auto"
              spaceBetween={50}
              breakpoints={{
                0:{ slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1300: { slidesPerView: 4 },
                1900: { slidesPerView: 5 },
                2400: { slidesPerView: "auto" }
              }}
              navigation={true}
              modules={[Navigation]}
            >
              {products.map((product, index) => (
                <SwiperSlide className="my-slide" key={index}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>) : (<div></div>)
    }
    </>
  )
}

export default CarouselProducts