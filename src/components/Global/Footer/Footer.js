import React from 'react';
import './Footer.css';
import Logo from '../../../assets/img/logo/logo.png';
import itachi from '../../../assets/img/footer/itachi.png';
import { Container } from 'react-bootstrap';


const Footer = () => {
    return (
        <div className='footer'>
            <Container>
                <div className="footer-top">
                    <div className="footer-top-left">
                        <div className="logo-footer">
                            <img src={Logo} alt="" />
                            <p>Suriken Model Shop</p>
                        </div>

                        <p className="desc-footer">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet ipsum necessitatibus, mollitia, error ratione maiores ea sit fuga esse tempore quam. Voluptates, enim molestias accusantium quam illo harum? Temporibus, vel?</p>
                        <p className='hotline'><i class="fa-solid fa-mobile-screen-button"></i> <span>Hotline Order</span></p>
                        <p className="phone">(012) 345 6789</p>

                        <ul className="social-footer">
                            <li><i className="fa-brands fa-facebook-f"></i></li>
                            <li><i className="fa-brands fa-instagram"></i></li>
                            <li><i className="fa-brands fa-youtube"></i></li>
                            <li><i className="fa-brands fa-tiktok"></i></li>
                        </ul>
                    </div>

                    <div className="footer-top-right">
                        <div className="col">
                            <h3 className="title-footer">USEFUL LINKS</h3>
                            <ul className="list-footer">
                                <li>New Product</li>
                                <li>Best Seller</li>
                                <li>Discount</li>
                                <li>Anime & Manga</li>
                                <li>Bundle & Sale</li>
                            </ul>
                        </div>

                        <div className="col">
                            <h3 className="title-footer">MY ACCOUNT</h3>
                            <ul className="list-footer">
                                <li>My Profile</li>
                                <li>My Order History</li>
                                <li>Order Tracking</li>
                                <li>Shipping Info</li>
                                <li>Shopping Cart</li>
                            </ul>
                        </div>

                        <div className="col">
                            <h3 className="title-footer">SHOP</h3>
                            <ul className="list-footer">
                                <li>About Us</li>
                                <li>Blog</li>
                                <li>Contact Us</li>
                                <li>Gift Cards</li>
                                <li>Model Store Locator</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bot">
                    <div className="footer-bot-left">
                        <h3>NEWSLETTER</h3>
                        <p className='subs'>Subscrible & get 10% discount. Get E-mail updates about our latest shop and special offers.</p>
                        <input type="email" placeholder='Enter your email...' className="custom-input" />
                        <button>SEND</button>
                    </div>
                    <div className="footer-bot-right">
                        <p>Copyright © 2024 Suriken. All rights reserved</p>
                        <p>Privacy & Cookie Policy | Terms of Service</p>
                    </div>

                </div>
            </Container>
            <div className="pop">
                <img src={itachi} alt="" />
            </div>
        </div>
    );
};

export default Footer;