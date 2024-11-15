import React from 'react';
import './NewProduct.css';
import { Link } from 'react-router-dom';
import Video from '../../../../assets/img/new-product/goku.mp4';

const NewProduct = () => {
    return (
        <div className='new-product'>
            <video autoPlay loop muted>
                <source src={Video} type="video/mp4" />
            </video>

            <div className="new">
                <h1>For True Fans: Explore Our Latest Anime Figure Release!</h1>
                <Link to="/product" onClick={() => window.scrollTo(0, 0)}>
                    <button>STEP INTO</button>
                </Link>
            </div>

        </div>
    );
};

export default NewProduct;