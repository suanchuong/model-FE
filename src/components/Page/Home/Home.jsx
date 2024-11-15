import React from 'react';
import Banner from '../../Global/Banner/Banner';
import Headline from './Headline/Headline';
import Title from './Title/Title';
import Information from './Info/Information';
import Product from './Product/Product';
import NewProduct from './NewProduct/NewProduct';
import Sale from './Sale/Sale';
import Wallpaper from './Wallpaper/Wallpaper';
import Feedback from './Feedback/Feedback';
import Attachment from './Attachment/Attachment';
import Contact from './Contact/Contact';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <Headline></Headline>
            <Title></Title>
            <Information></Information>
            <Product></Product>
            <NewProduct></NewProduct>
            <Sale></Sale>
            <Attachment></Attachment>
            <Feedback></Feedback>
            <Wallpaper></Wallpaper>
            <Contact></Contact>
        </>
    );
};

export default Home;