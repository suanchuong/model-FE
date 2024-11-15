import React from 'react';
import { Link } from 'react-router-dom';
import { UseCart } from '../../../context/CartContext';

const Cart = (props) => {
    const { handleAddCart } = UseCart();

    const addToCart = () => {
        const product = {
            id: props.id,
            image: props.image,
            title: props.title,
            price: props.price,
            size: props.size,
            ratio: props.ratio,
            producer: props.producer,
            material: props.material,
            quantity: 1,
        };
        handleAddCart(product);
    };

    const isRequestStatus = props.status && props.status.toLowerCase() === "request";

    return (
        <div className='cart-pro'>
            <div className="thumb">
                <Link key={props.id} to={`/product/${props.id}`}>
                    <img src={props.image} alt='' />
                </Link>
                <div className="overplay">
                    {!isRequestStatus && <button onClick={addToCart}>Add To Cart</button>}
                </div>
            </div>
            <Link key={props.id} to={`/product/${props.id}`}>
                <div className="text">
                    <p className='price'>
                        {isRequestStatus ? "Order Now" : `$ ${props.price}`}
                    </p>
                    <p className='name'>{props.title}</p>
                    <p className='size'>Size: {props.size}</p>
                    <p className="ratio">Ratio: {props.ratio}</p>
                    <p className="producer">{props.producer}</p>
                    <p className="material">{props.material}</p>
                    <div className='review'>
                        <span className="rate">
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star"></i>
                            <i className="fa-solid fa-star-half-stroke"></i>
                        </span>
                        <span>(5 reviews)</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Cart;
