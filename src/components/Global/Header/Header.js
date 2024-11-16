import React, { useState, useEffect } from 'react';
import './Header.css';
import { Container, Button, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UseCart } from '../../../context/CartContext';
import { Link as ScrollLink } from 'react-scroll';
import Logo from '../../../assets/img/logo/logo.png';
import Shop from '../../../assets/img/logo/shop.png';
import Pop from '../../../assets/img/logo/1.png';

const Header = ({ name, ...props }) => {
    const [showSearch, setShowSearch] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { cart, handleQuantity } = UseCart();

    //Hàm đóng tắt popup shopping và search
    const handleSearchClose = () => setShowSearch(false);
    const handleSearchShow = () => setShowSearch(true);
    const handleCartClose = () => setShowCart(false);
    const handleCartShow = () => setShowCart(true);

    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalSpent = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

    //Hàm tìm keysearch
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchQuery.length > 2) {
                const response = await fetch(`https://672dbfbdfd89797156438317.mockapi.io/listProduc-?search=${searchQuery}`);
                const data = await response.json();
                setSearchResults(data);
            } else {
                setSearchResults([]);
            }
        };
        fetchSearchResults();
    }, [searchQuery]);

    return (
        <div className='header'>
            <Container>
                <div className="header-top">
                    <div className="top-left">
                        <p>Follow us: </p>
                        <ul className="social">
                            <li><i className="fa-brands fa-facebook-f"></i></li>
                            <li><i className="fa-brands fa-instagram"></i></li>
                            <li><i className="fa-brands fa-youtube"></i></li>
                            <li><i className="fa-brands fa-tiktok"></i></li>
                        </ul>
                    </div>

                    <div className="user">
                        <button className='sign-in'>Sign In</button>
                        <button className='sign-up'>Sign Up</button>
                    </div>
                </div>
            </Container>

            <div className="header-mid">
                <div className="header-logo">
                    <img src={Logo} alt="" className='logo' />
                </div>

                <div className="search">
                    <Button onClick={handleSearchShow} className="me-2">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </Button>
                    <Offcanvas show={showSearch} onHide={handleSearchClose} placement="start" className="offcanvas-custom" {...props}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Search</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body className='key-search'>
                            <input
                                type="text"
                                className='custom-input'
                                placeholder='Looking for something special....'
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <div className="search-results">
                                {searchResults.length > 0 ? (
                                    searchResults.map(product => (
                                        <Link
                                            key={product.id}
                                            to={`/product/${product.id}`}
                                            className="search-result-item"
                                            onClick={handleSearchClose} 
                                        >
                                            <h5>{product.title}</h5>
                                            <p>{product.description}</p>
                                        </Link>
                                    ))
                                ) : (
                                    <p>No products found.</p>
                                )}
                            </div>
                            <div className="pop-up">
                                <img src={Pop} alt="" />
                            </div>
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>

                <div className="shopping">
                    <div className="thumb">
                        <Button onClick={handleCartShow} className="me-2">
                            <img src={Shop} alt="" />
                        </Button>
                        <Offcanvas show={showCart} onHide={handleCartClose} placement="end" className="offcanvas-custom" {...props}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>Your Shopping Cart</Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                {cart.length > 0 ? (
                                    <>
                                        {cart.map(item => (
                                            <div className='shop' key={item.id}>
                                                <div className="shop-left">
                                                    <img src={item.image} alt='' />
                                                </div>
                                                <div className="shop-right">
                                                    <h5>{item.title}</h5>
                                                    <p className='price'>${(item.price * item.quantity).toFixed(2)}</p>
                                                    <div className="quantity-control">
                                                        <Button variant="outline-secondary" onClick={() => handleQuantity(item.id, 'minus')}>-</Button>
                                                        <span className="quantity">{item.quantity}</span>
                                                        <Button variant="outline-secondary" onClick={() => handleQuantity(item.id, 'plus')}>+</Button>
                                                    </div>
                                                    <Button variant="danger" onClick={() => handleQuantity(item.id, 'delete')}>Remove</Button>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="total-spent">
                                            <h5>Total Spent: </h5>
                                            <p>${totalSpent}</p>
                                        </div>

                                        <div className="cart-buttons">
                                            <Link
                                                to="/shopping"
                                                className="view-cart"
                                                onClick={handleCartClose}
                                            >
                                                VIEW CART
                                            </Link>
                                            <Link
                                                to="/checkout"
                                                className="buy"
                                                onClick={handleCartClose}
                                            >
                                                BUY NOW
                                            </Link>
                                        </div>
                                    </>
                                ) : (
                                    <p>Your cart is empty.</p>
                                )}
                            </Offcanvas.Body>
                        </Offcanvas>
                        <div className="overplay">
                            <p>{totalItems}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Container>
                <div className="header-bot">
                    <ul className="header-bot-menu">
                        <li><Link to='/'><span>HOME</span></Link></li>
                        <li className="dropdown-container">
                            <Link to={`/product`}><span>PRODUCT</span></Link>
                            <ul className="dropdown">
                                <li><Link to={`/product?category=Naruto Shippuden`}>NARUTO SHIPPUDEN</Link></li>
                                <li><Link to={`/product?category=Dragon Ball`}>DRAGON BALL</Link></li>
                                <li><Link to={`/product?category=Kimetsu`}>KIMETSU NO YAIBA</Link></li>
                                <li><Link to={`/product?category=One Piece`}>ONE PIECE</Link></li>
                            </ul>
                        </li>
                        <li className="dropdown-container">
                            <Link to="/product"><span>SHOP</span></Link>
                            <ul className="dropdown">
                                <li><Link to={`/product?status=Available`}>AVAILABLE</Link></li>
                                <li><Link to={`/product?status=Request`}>PLACE A REQUEST</Link></li>
                                <li><Link to={`/product?status=2Hand`}>PRE OWNED</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <ul className="header-bot-menu">
                        <li><Link to=''><span>PAGES</span></Link></li>
                        <li><ScrollLink to="feedback" smooth={true}><span>BLOG</span></ScrollLink></li>
                        <li><ScrollLink to="contactus" smooth={true}><span>CONTACT US</span></ScrollLink></li>
                    </ul>
                </div>
            </Container>
        </div>
    );
};

export default Header;
