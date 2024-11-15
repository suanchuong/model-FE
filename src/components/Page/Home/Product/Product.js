import React, { useRef, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'aos/dist/aos.css';
import AOS from 'aos';
import './Product.css';
import useFetch from '../../../../hooks/useFetch';
import BestCart from '../../../Global/Cart/Cart';

const Product = () => {
    const bestSeller = useFetch('https://672dbfbdfd89797156438317.mockapi.io/listProduc-');
    const [filteredBestSeller, setFilteredBestSeller] = useState([]);

    const swiperRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
        });

        if (bestSeller && bestSeller.length > 0) {
            const filtered = bestSeller.filter(item => item.status === 'Best');
            setFilteredBestSeller(filtered);
        }
    }, [bestSeller]);

    return (
        <div className='best-seller' data-aos="fade-right">
            <Container>
                <div className="title-seller">
                    <h1>Best Seller Product</h1>

                    <Link to="/product" onClick={() => window.scrollTo(0, 0)}>
                        <p>View All Products <i className="fa-solid fa-chevron-right"></i></p>
                    </Link>
                </div>

                <div className="navigation-buttons">
                    <i className="fa-solid fa-angle-left" onClick={() => swiperRef.current.swiper.slidePrev()}></i>
                    <i className="fa-solid fa-angle-right" onClick={() => swiperRef.current.swiper.slideNext()}></i>
                </div>

                {/* Swiper carousel */}
                <Swiper
                    ref={swiperRef}
                    spaceBetween={30}
                    slidesPerView={4} // Mặc định: 4 item
                    pagination={{ clickable: true }}
                    navigation={false}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    speed={1000}
                    modules={[Navigation, Pagination, Autoplay]}
                    breakpoints={{
                        996: {
                            slidesPerView: 3,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        470: {
                            slidesPerView: 1,
                        },
                        415: {
                            slidesPerView: 1,
                        },
                        400: {
                            slidesPerView: 1,
                        },
                        360: {
                            slidesPerView: 1,
                        },
                        340: {
                            slidesPerView: 1,
                        },
                        310: {
                            slidesPerView: 1,
                        },
                    }}
                >
                    {filteredBestSeller.length > 0 ? (
                        filteredBestSeller.map((item) => (
                            <SwiperSlide key={item.id}>
                                <BestCart
                                    id={item.id}
                                    image={item.image}
                                    price={item.price}
                                    title={item.title}
                                    ratio={item.ratio}
                                    size={item.size}
                                />
                            </SwiperSlide>
                        ))
                    ) : (
                        <p>No best sellers available.</p>
                    )}
                </Swiper>
            </Container>
        </div>
    );
};

export default Product;
