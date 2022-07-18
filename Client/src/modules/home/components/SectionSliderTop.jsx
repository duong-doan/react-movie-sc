import { Swiper, SwiperSlide } from 'swiper/react';
import isEmpty from 'lodash/isEmpty';
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper';
import { useRef, useState } from 'react';
import cls from 'classnames';
import { Link } from 'react-router-dom';

import TextLineThrough from 'components/TextLineThrough/index';
import image1 from 'assets/images/slider_top/Skull - 63533.mp4';
import image2 from 'assets/images/slider_top/h1-slide-3-1.jpg';
import image3 from 'assets/images/slider_top/h1-slide-2-1.jpg';
import { AUTH_ROUTES } from 'modules/auth/store/constant';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from 'modules/auth/store/selector';

SwiperCore.use([Autoplay]);

function SectionSliderTop() {
  const swiperRef = useRef(null);
  const [index, setIndex] = useState(1);
  const [slideBack, setSlideBack] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const sliderImages = [
    {
      id: 1,
      title: 'Every Things Is Secret',
      img: (
        <video autoPlay='autoPlay' loop muted>
          <source src={image1} type='video/mp4' />
        </video>
      ),
    },
    {
      id: 2,
      title: 'Memories Lost Love Found',
      img: <img src={image2} alt='image2' />,
    },
    {
      id: 3,
      title: 'Fireplace And Other Tales',
      img: <img src={image3} alt='image3' />,
    },
  ];

  const handleClickPrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
      setSlideBack(true);
    }
  };

  const handleClickNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
      setSlideBack(false);
    }
  };

  const handleSlideChange = (e) => {
    setIndex(e.realIndex + 1);
  };

  return (
    <div className='slider-top'>
      <Swiper
        ref={swiperRef}
        spaceBetween={16}
        effect='fade'
        fadeEffect={{
          crossFade: false,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className='mySwiper'
        loop
        onSlideChange={handleSlideChange}
        autoplay={{
          delay: 5000,
        }}
      >
        {sliderImages.map((image) => {
          const slideActive = image.id === index;
          return (
            <SwiperSlide key={image.id}>
              <span className={`slide-title ${!!slideActive ? 'fade-in' : ''}`}>
                {image.title}
              </span>
              {image.img}
            </SwiperSlide>
          );
        })}
        <div className='slider-top__nav-custom'>
          <button className='swiper-slide-prev' onClick={handleClickPrev}>
            <TextLineThrough color='white'>Prev</TextLineThrough>
          </button>
          <span></span>
          <button className='swiper-slide-next' onClick={handleClickNext}>
            <TextLineThrough color='white'>Next</TextLineThrough>
          </button>
        </div>
        <div className='slider-top__column-left'>
          {isAuthenticated ? (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a href='#'>
              <ul className='social-list'>
                <li>W</li>
                <li>E</li>
                <li>L</li>
                <li>C</li>
                <li>O</li>
                <li>M</li>
              </ul>
            </a>
          ) : (
            <Link to={AUTH_ROUTES.LOGIN}>
              <ul className='social-list'>
                <li>L</li>
                <li>O</li>
                <li>G</li>
                <li>I</li>
                <li>N</li>
              </ul>
            </Link>
          )}
        </div>
        <div className='slider-top__column-right'>
          <div
            className={cls(`progress slide-${index}`, {
              back: slideBack,
            })}
          ></div>
          <span>{`0${index}`}</span>
        </div>
      </Swiper>
    </div>
  );
}

export default SectionSliderTop;
