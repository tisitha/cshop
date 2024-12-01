import React from 'react';
import { Navbar, Navbottom, Carousel, CarouselProducts,Footer } from './';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Navbottom />
      <Carousel />
      <div className='cp'>
        <CarouselProducts title={"NEW ARRIVALS"} api={"new"} />
        <CarouselProducts title={"TOP SELLING PRODUCTS"} api={"top"} />
        <CarouselProducts title={"BEST DEALS"} api={"deal"} />
        <Footer/>
      </div>

    </>
  )
}

export default HomePage