import {Swiper,SwiperSlide} from "swiper/react";
import { Navigation, Autoplay } from 'swiper/modules';

import "swiper/css";
import "swiper/css/navigation"
import "./carousel.css";

import slide1 from "./images/slide1.jpg";
import slide2 from "./images/slide2.jpg";
import slide3 from "./images/slide3.jpg";
import slide4 from "./images/slide4.jpg";

const Carousel = () => {
  return (
    <div className="carousel">
        <Swiper className="carouselSwipeBtns"
            loop={true}
            spaceBetween={0}
            navigation={true}
            modules={[Navigation,Autoplay]}
            autoplay={{
                delay:4500
            }}
        >
            <SwiperSlide>
                <img src={slide1}/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide2}/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide3}/>
            </SwiperSlide>
            <SwiperSlide>
                <img src={slide4}/>
            </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default Carousel