import React, { useEffect } from 'react';
import './Information.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import Pic_1 from '../../../../assets/img/information/1.jpg';
import Pic_2 from '../../../../assets/img/information/2.jpg';
import Pic_3 from '../../../../assets/img/information/3.jpg';

const Info = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <div className='information'>
            {/* Content 1 */}
            <div className="content" data-aos="zoom-in-right">
                <img src={Pic_1} alt="" />
                <div className="text">
                    <p className='head'>Model</p>
                    <h3>Naruto Shipuden</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>
            </div>

            {/* Content 2 */}
            <div className="content" data-aos="zoom-out">
                <img src={Pic_2} alt="" />
                <div className="text">
                    <p className='head'>Model</p>
                    <h3>Dragon Ball</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>
            </div>

            {/* Content 3 */}
            <div className="content" data-aos="zoom-in-left">
                <img src={Pic_3} alt="" />
                <div className="text">
                    <p className='head'>Model</p>
                    <h3>Kimetsu No Yaiba</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                </div>
            </div>
        </div>
    );
};

export default Info;
