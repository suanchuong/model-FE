import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './Contact.css';
import 'aos/dist/aos.css'; 
import AOS from 'aos'; 

const Contact = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500, 
            easing: 'ease-in-out', 
            once: true, 
        });
    }, []);

    return (
        <Container id="contactus">
            <div className='contact' data-aos="zoom-in-up">
                <div className="left-contact">
                    <h2 className='head-contact'>CONTACT <span>US</span></h2>
                    <p className='text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos natus error accusamus praesentium assumenda labore sapiente fuga. Voluptatem nisi corporis saepe a fugiat similique cumque officia magni. Ducimus, nam veritatis!</p>
                    <p className="address">
                        <i className="fa-solid fa-paper-plane"></i>
                        <span>Auguststraße 245, 10117 Berlin</span>
                    </p>
                    <p className="email">
                        <i className="fa-solid fa-envelope"></i>
                        <span>suriken@example.com</span>
                    </p>
                </div>

                <div className="right-contact">
                    <form>
                        <input type="text" placeholder='Your Name' className="custom-input" />
                        <input type="email" placeholder='Email Address' className="custom-input" />
                        <input type="text" placeholder='Your Message...' className="custom-input" />
                        <button type="submit">SUBMIT</button>
                    </form>
                </div>
            </div>
        </Container>
    );
};

export default Contact;
