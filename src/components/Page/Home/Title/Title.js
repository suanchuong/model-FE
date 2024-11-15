import React, { useEffect } from 'react';
import './Title.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

const Title = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <div className='title-page'>
            <h1 data-aos="zoom-in-up">A <span>MODEL</span> FOR YOUR WORLD</h1>
            <p data-aos="zoom-in-down">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, odit? Ullam reiciendis delectus iure earum, unde veritatis eum explicabo doloremque, minus enim quae a exercitationem perferendis recusandae magni animi labore.</p>
        </div>
    );
};

export default Title;
