import React from 'react'
import baner1 from './homeassets/banner1.jpg'
import banner2 from './homeassets/banner2.jpg'
import banner3 from './homeassets/banner3.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef,useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './banner.css'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
  return (
    <div>
          
     <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide id='slide1'>

        <h1 className='text-white text-[32px] text-center font-[700]'>Explore, Learn, Inspire: Your Gateway to Knowledge</h1>       


        </SwiperSlide>
        <SwiperSlide id="slide2">

        <h1 className='text-white text-[32px] text-center font-[700]'>Discover the World Through Words: Journey with Us</h1>
   


        </SwiperSlide>
        <SwiperSlide id="slide3">

        <h1 className='text-white text-[32px] text-center font-[700]'>"Ignite Your Imagination: Stories, Ideas, and Insights Await"</h1>


        </SwiperSlide>
        
      </Swiper>



    </div>
  )
}

export default Banner
