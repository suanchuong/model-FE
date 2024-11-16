import React, { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'aos/dist/aos.css';
import AOS from 'aos';
import useFetch from '../../../../hooks/useFetch';
import './Sale.css';

const Sale = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const swiperRef = useRef(null);
    const products = useFetch('https://672dbfbdfd89797156438317.mockapi.io/listProduc-');
    const saleProducts = products.filter(product => product.status === 'sale');

    useEffect(() => {
        const endDate = new Date('2024-11-20T00:00:00');

        const countdown = setInterval(() => {
            const now = new Date();
            const timeDifference = endDate - now;

            if (timeDifference <= 0) {
                clearInterval(countdown);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <div className='product-sale' data-aos="fade-left">
            <Container>
                {/* Title Sale */}
                <div className="title-featured">
                    <h1>Featured Product</h1>
                    {/* Custom Navigation Buttons */}
                    <div className="icon">
                        <i className="fa-solid fa-angle-left arrow left" onClick={() => swiperRef.current.swiper.slidePrev()}></i>
                        <i className="fa-solid fa-angle-right arrow right" onClick={() => swiperRef.current.swiper.slideNext()}></i>
                    </div>
                </div>

                {/* Swiper Sale */}
                <div className="swiper-container">
                    <Swiper
                        ref={swiperRef}
                        navigation={false}
                        pagination={{ clickable: true }}
                        spaceBetween={30}
                        slidesPerView={2}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        speed={1000}
                        loop={true}
                        modules={[Navigation, Pagination, Autoplay]}
                        className="mySwiper"
                        breakpoints={{
                            1200: {
                                slidesPerView: 2,
                            },
                            996: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 1,
                            },
                            430: {
                                slidesPerView: 1,
                            },
                        }}
                    >
                        {saleProducts.map((item) => (
                            <SwiperSlide key={item.id}>
                                <Link
                                    to={`/product/${item.id}`}
                                    onClick={() => window.scrollTo(0, 0)}
                                >
                                    <div className="sales-item">
                                        <div className="thumb">
                                            <img src={item.image} alt={item.title} />
                                            <div className="overplay">
                                                {item.sale}% OFF
                                            </div>
                                        </div>
                                        <div className="title">
                                            <h3>{item.title}</h3>
                                            <div className="price">
                                                <p className="original-price">$ {item.price}</p>
                                                <p className="discounted-price">
                                                    $ {(item.price - (item.price * item.sale / 100)).toFixed(0)}
                                                </p>
                                            </div>
                                            <p className="ratio">Ratio: {item.ratio}</p>
                                            <p className="size">Size: {item.size}</p>
                                            <div className="review">
                                                <p className="rate">
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star"></i>
                                                    <i className="fa-solid fa-star-half-stroke"></i>
                                                </p>
                                                <p className='view'>(5 reviews)</p>
                                            </div>
                                            <p className='title-time'>Hurry up! Sale ends in: </p>
                                            <div className='timeout'>
                                                <span>{timeLeft.days}</span> : <span>{timeLeft.hours}</span> : <span>{timeLeft.minutes}</span> : <span>{timeLeft.seconds}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Container>
        </div>
    );
};

export default Sale;
