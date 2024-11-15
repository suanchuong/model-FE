import React, { useState } from 'react';
import { Container, Tab, Tabs, Modal, Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { UseCart } from '../../../context/CartContext';
import useFetch from '../../../hooks/useFetch';
import './Detail.css';
import Location from '../../../assets/more/house.png';
import Truck from '../../../assets/more/pickup-truck.png';
import Pic_1 from '../../../assets/img/feedback/2.jpg';
import Related from '../../Global/Cart/Cart';
import { FaCheckCircle } from 'react-icons/fa';

const Detail = () => {
    const { id } = useParams();
    const detailProduct = useFetch(`https://672dbfbdfd89797156438317.mockapi.io/listProduc-/${id}`);
    const related = useFetch('https://672dbfbdfd89797156438317.mockapi.io/listProduc-');
    const { handleAddCart } = UseCart();

    const shuffledRelated = related ? [...related].sort(() => Math.random() - 0.5) : [];
    console.log(related);
    const [key, setKey] = useState('home');
    const [quantity, setQuantity] = useState(1);
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formData, setFormData] = useState({
        country: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postCode: ''
    });

    const handleQuantityChange = (type) => {
        if (type === 'plus') {
            setQuantity(prev => prev + 1);
        } else if (type === 'minus' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const salePrice = detailProduct && detailProduct.sale
        ? (detailProduct.price - (detailProduct.price * detailProduct.sale / 100)).toFixed(2)
        : null;

    const isRequestStatus = detailProduct?.status === "Request";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRequestSubmit = async () => {
        try {
            const orderName = detailProduct?.title;

            const response = await fetch('https://672dbfbdfd89797156438317.mockapi.io/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    orderName,
                    status: 'pending',
                    date: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                setShowRequestModal(false);
                setShowSuccessModal(true);
            } else {
                alert("Failed to place the request");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Error placing request");
        }
    };

    return (
        <Container>
            {detailProduct ? (
                <div className='detail-product'>
                    <div className="detail-left">
                        <img src={detailProduct.image} alt={detailProduct.title} />
                    </div>

                    <div className="detail-right">
                        <h3 className="title">{detailProduct.title}</h3>
                        <p className="price">
                            {isRequestStatus ? (
                                "Order Now"
                            ) : salePrice ? (
                                <>
                                    <span className="original-price">${detailProduct.price}</span>
                                    <span className="discounted-price">${salePrice}</span>
                                </>
                            ) : (
                                `$ ${detailProduct.price}`
                            )}
                        </p>
                        <p className="ratio">Ratio: {detailProduct.ratio}</p>
                        <p className="size">Size: {detailProduct.size}</p>
                        <p className="producer">Studio: {detailProduct.producer}</p>
                        <p className="material">Material: {detailProduct.material}</p>

                        <div className="rate">
                            <p><i className="fa-solid fa-star"></i> Always committed to credibility and the best service quality.</p>
                            <p><i className="fa-solid fa-star"></i> Suriken has served the passion of thousands of customers nationwide.</p>
                        </div>

                        <div className="add">
                            {isRequestStatus ? (
                                <button className='btn-request' onClick={() => setShowRequestModal(true)}>Place A Request</button>
                            ) : (
                                <>
                                    <div className="quantity">
                                        <button onClick={() => handleQuantityChange('minus')}>-</button>
                                        <span>{quantity}</span>
                                        <button onClick={() => handleQuantityChange('plus')}>+</button>
                                    </div>
                                    <button className='btn-add' onClick={() => handleAddCart({ ...detailProduct, quantity })}>Add To Cart</button>
                                </>
                            )}
                        </div>

                        <div className="information">
                            <div className='address'>
                                <img src={Location} alt="" />
                                <p>123 Maple Street, Springfield, IL 6270</p>
                            </div>
                            <div className='address'>
                                <img src={Truck} alt="" />
                                <p>Nationwide COD shipping, pay upon receipt.</p>
                            </div>
                        </div>
                        <button className='hotline'>Hotline: (012) 345 6789</button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}

            <div className="describe">
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3"
                >
                    <Tab eventKey="home" title="Describe">
                        Tab content for Home
                    </Tab>
                    <Tab eventKey="profile" title="Comment">
                        <div className="desc">
                            <div className="desc-left">
                                <img src={Pic_1} alt="" />
                                <div className="name-review">
                                    <p>Jack Morrison</p>
                                    <p className='job'>Engineer</p>
                                </div>
                            </div>
                            <div className="desc-right">
                                <div className="text">
                                    <p>" Lorem ipsum dolor sit amet consectetur adipisicing elit..."</p>
                                    <div className="rate">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star-half-stroke"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>

            <div className="related">
                <h3>RELATED PRODUCTS</h3>
                <div className="product-rel">
                    {shuffledRelated.slice(0, 8).map((item) => (
                        <Link
                            to={`/detail/${item.id}`}
                            key={item.id}
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            <Related
                                id={item.id}
                                key={item.id}
                                image={item.image}
                                title={item.title}
                                price={item.price}
                                ratio={item.ratio}
                                size={item.size}
                            />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Modal for Place A Request */}
            <Modal show={showRequestModal} onHide={() => setShowRequestModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Place A Request</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <input
                            type="text"
                            name="country"
                            placeholder="Country/Region"
                            value={formData.country}
                            onChange={handleInputChange}
                        />
                        <div className="name">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First name"
                                className="input-checkout-left"
                                value={formData.firstName}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last name"
                                className="input-checkout-right"
                                value={formData.lastName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                        <div className="name">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                className="input-checkout-left"
                                value={formData.city}
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="postCode"
                                placeholder="Postal Code"
                                className="input-checkout-right"
                                value={formData.postCode}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleRequestSubmit}>
                        Submit Request
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal for Purchase Success */}
            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)} centered className="success-modal">
                <Modal.Header closeButton className="modal-success-header">
                    <Modal.Title className="text-center w-100">Order Successful</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <FaCheckCircle color="green" size={100} className="mb-3 zoom-in" />
                    <h4 className="mb-3">Thank you for your Order!</h4>
                    <p className='thanks'>We will contact you to confirm your order soon.</p>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Detail;
