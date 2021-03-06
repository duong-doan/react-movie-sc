import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image1 from 'assets/images/slider_top/port-1-img-1.jpg';
import Image2 from 'assets/images/slider_top/port-1-img-2.jpg';
import Image3 from 'assets/images/slider_top/port1-img-4.jpg';
import Image4 from 'assets/images/slider_top/home-1-rev-video-background.jpg';

const SectionSliderBottom = () => {
  const handleSlideChange = (e) => {};
  return (
    <div className='slider-bottom__wrapper'>
      <Swiper
        slidesPerView={3}
        spaceBetween={5}
        className='mySwiper'
        centeredSlidesBounds
        loop
        centeredSlides
        onSlideChange={handleSlideChange}
        autoplay={{
          delay: 3000,
        }}
      >
        <SwiperSlide>
          <img src={Image1} alt='img' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Image2} alt='img' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Image3} alt='img' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={Image4} alt='img' />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SectionSliderBottom;
