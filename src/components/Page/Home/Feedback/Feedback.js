import React, { useEffect } from 'react';
import './Feedback.css';
import Pic_1 from '../../../../assets/img/feedback/1.jpg';
import Pic_2 from '../../../../assets/img/feedback/2.jpg';
import Pic_3 from '../../../../assets/img/feedback/3.jpg';
import { Container } from 'react-bootstrap';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Feedback = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
            easing: 'ease-in-out', 
        });
    }, []);

    return (
        <Container id="feedback">
            <div className='feed-back' data-aos="flip-left">
                <div className="left">
                    <div className="head">
                        <h5>REVIEW & AWARDS</h5>
                        <h2>Customers Reviews</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex in quae dolor sunt nesciunt debitis illum aperiam!</p>
                    </div>
                    <div className="people">
                        <div className="thumb">
                            <img src={Pic_1} alt="" />
                            <img src={Pic_2} alt="" />
                            <img src={Pic_3} alt="" />
                        </div>
                    </div>
                    <div className="view">
                        <i className="fa-solid fa-star"></i>
                        4.9
                        <span>(500 reviews)</span>
                    </div>
                </div>

                <div className="right">
                    <div className="icon-back">
                        <i className="fa-solid fa-angle-left"></i>
                    </div>
                    <div className="image">
                        <img src={Pic_1} alt="" />
                        <div className="name-review">
                            <p>Jack Morrison</p>
                            <p className='job'>Engineer</p>
                        </div>
                    </div>

                    <div className="text">
                        <div className="rate">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                        </div>
                        <p>" Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio rem nobis eaque laudantium odit tempore ullam molestias eum nam, dolores atque dolore a blanditiis quidem, in reiciendis dolorum nulla numquam. "</p>
                    </div>
                    <div className="icon-next">
                        <i className="fa-solid fa-angle-right"></i>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default Feedback;
