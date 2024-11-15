import React from 'react';
import './Banner.css';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Naruto from '../../../assets/img/banner/naruto.mp4';
import Goku from '../../../assets/img/banner/goku.mp4';
import Zoro from '../../../assets/img/banner/zoro.mp4';
import Kimetsu from '../../../assets/img/banner/kimetsu.mp4';


const Banner = () => {
    return (
        <div className='banner'>
            <Carousel fade>
                <Carousel.Item>
                    <video autoPlay loop muted>
                        <source src={Naruto} type="video/mp4" />
                    </video>
                    <Carousel.Caption>
                        <h1>CHOOSE YOUR PREFERENCES</h1>
                        <Link to="/product" onClick={() => window.scrollTo(0, 0)}>
                            <button>BUY NOW</button>
                        </Link>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <video autoPlay loop muted>
                        <source src={Goku} type="video/mp4" />
                    </video>
                    <Carousel.Caption>
                        <h1>CHOOSE YOUR PREFERENCES</h1>
                        <Link to="/product" onClick={() => window.scrollTo(0, 0)}>
                            <button>BUY NOW</button>
                        </Link>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <video autoPlay loop muted>
                        <source src={Zoro} type="video/mp4" />
                    </video>
                    <Carousel.Caption>
                        <h1>CHOOSE YOUR PREFERENCES</h1>
                        <Link to="/product" onClick={() => window.scrollTo(0, 0)}>
                            <button>BUY NOW</button>
                        </Link>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <video autoPlay loop muted>
                        <source src={Kimetsu} type="video/mp4" />
                    </video>
                    <Carousel.Caption>
                        <h1>CHOOSE YOUR PREFERENCES</h1>
                        <Link to="/product" onClick={() => window.scrollTo(0, 0)}>
                            <button>BUY NOW</button>
                        </Link>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Banner;