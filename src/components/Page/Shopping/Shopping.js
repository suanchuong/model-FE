import React from 'react';
import { Container } from 'react-bootstrap';
import { UseCart } from '../../../context/CartContext';
import { Link } from 'react-router-dom';
import './Shopping.css';

const Shopping = () => {
    const { cart, handleQuantity, handleRemove } = UseCart();
    const totalSpent = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

    return (
        <div className="shopping-page">
            <h1 className="cart-header">
                {cart.length === 0 ? "Your Shopping Cart is Empty" : "Your Shopping Cart"}
            </h1>
            <Container>
                {cart.length > 0 ? (
                    cart.map(item => (
                        <div className="shopping-item" key={item.id}>
                            <div className="thumb-checkout">
                                <img src={item.image} alt="" className="item-image" />
                            </div>
                            <h5>{item.title}</h5>
                            <p className="price-shop">${(item.price * item.quantity).toFixed(2)}</p>
                            <div className="quantity-control">
                                <div className="btn-checkout">
                                    <button onClick={() => handleQuantity(item.id, 'minus')}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => handleQuantity(item.id, 'plus')}>+</button>
                                </div>
                                <button className="delete-btn" onClick={() => handleRemove(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="empty-cart-message">Add items to start shopping!</p>
                )}
                
                {cart.length > 0 && (
                    <>
                        <div className="total">
                            <h5>Total Spent: </h5>
                            <p>${totalSpent}</p>
                        </div>
                        <Link to="/checkout" className="checkout-link" onClick={() => window.scrollTo(0, 0)}>Purchase</Link>
                    </>
                )}
            </Container>
        </div>
    );
};

export default Shopping;
