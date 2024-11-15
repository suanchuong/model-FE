import React, { useEffect } from 'react';
import './Headline.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import ninja from '../../../../assets/img/headline/1.png';
import dragon from '../../../../assets/img/headline/2.png';
import piece from '../../../../assets/img/headline/3.png';
import demon from '../../../../assets/img/headline/4.png';

const Headline = () => {
    useEffect(() => {
        AOS.init({
            duration: 500, 
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <div className='headline'>
            <div className="list-icon" data-aos="fade-down">
                <img src={ninja} alt="Ninja Hidden" className="image-hide" />
                <img src={ninja} alt="Ninja" className="image-show" /> 
            </div>

            <div className="list-icon" data-aos="fade-down">
                <img src={dragon} alt="Dragon Hidden" className="image-hide" />
                <img src={dragon} alt="Dragon" className="image-show" />
            </div>

            <div className="list-icon" data-aos="fade-down">
                <img src={demon} alt="Demon Hidden" className="image-hide" />
                <img src={demon} alt="Demon" className="image-show" />
            </div>

            <div className="list-icon" data-aos="fade-down">
                <img src={piece} alt="Piece Hidden" className="image-hide" />
                <img src={piece} alt="Piece" className="image-show" />
            </div>
        </div>
    );
};

export default Headline;
