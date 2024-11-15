import React, { useState, useRef } from 'react';
import { UseCart } from '../../../context/CartContext';
import { Container, Button, Alert, Modal } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';
import { FaCheckCircle } from 'react-icons/fa';
import './Checkout.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import emailjs from "@emailjs/browser";
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, clearCart } = UseCart();
    const totalSpent = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    const navigate = useNavigate();

    const discountCodes = [
        { type: '10% off', discount: 0.10 },
        { type: '15% off', discount: 0.15 },
        { type: '20% off', discount: 0.20 },
        { type: '30% off', discount: 0.30 },
        { type: '35% off', discount: 0.35 },
        { type: '40% off', discount: 0.40 },
    ];

    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [spinning, setSpinning] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const discountedTotal = selectedDiscount?.discount
        ? (totalSpent * (1 - selectedDiscount.discount)).toFixed(2)
        : totalSpent;

    const handleSpinWheel = () => {
        setSpinning(true);
        setTimeout(() => {
            const randomDiscount = discountCodes[Math.floor(Math.random() * discountCodes.length)];
            setSelectedDiscount(randomDiscount);
            setSpinning(false);
        }, 3000);
    };

    const handleCheckout = async () => {
        const orderData = {
            cart,
            total: discountedTotal,
            user_name: formik.values.user_name,
            user_email: formik.values.user_email,
            country: formik.values.country,
            first_name: formik.values.first_name,
            last_name: formik.values.last_name,
            address: formik.values.address,
            city: formik.values.city,
            post_code: formik.values.post_code,
        };

        try {
            // Gửi yêu cầu tạo đơn hàng kèm thông tin người dùng lên API
            const response = await fetch('https://672dbfbdfd89797156438317.mockapi.io/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                // Gửi email thông báo cho người dùng
                emailjs
                    .sendForm("service_godyinh", "template_cz5zash", form.current, {
                        publicKey: "xKWrIutfGYO06jP0e",
                    })
                    .then(
                        () => {
                            console.log("Email sent successfully!");
                        },
                        (error) => {
                            console.log("Email failed...", error.text);
                        }
                    );

                // Hiển thị modal thông báo đơn hàng thành công
                setShowModal(true);
                clearCart();
                formik.resetForm();
            } else {
                console.error('Lỗi khi gửi đơn hàng');
            }
        } catch (error) {
            console.error('Đã xảy ra lỗi:', error);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        navigate('/');
    };

    const form = useRef();
    const formik = useFormik({
        initialValues: {
            user_name: "Xuân Trường",
            user_email: "",
            country: "",
            first_name: "",
            last_name: "",
            address: "",
            city: "",
            post_code: "",
        },
        validationSchema: Yup.object({
            user_name: Yup.string().required("Required"),
            user_email: Yup.string().email("Invalid email address").required("Required"),
            country: Yup.string().required("Required"),
            first_name: Yup.string().required("Required"),
            last_name: Yup.string().required("Required"),
            address: Yup.string().required("Required"),
            city: Yup.string().required("Required"),
            post_code: Yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            emailjs
                .sendForm("service_godyinh", "template_cz5zash", form.current, {
                    publicKey: "xKWrIutfGYO06jP0e",
                })
                .then(
                    () => {
                        console.log("SUCCESS!");
                    },
                    (error) => {
                        console.log("FAILED...", error.text);
                    }
                );
        },
    });

    return (
        <Container>
            <div className="checkout-page">
                <div className="checkout-pay">
                    <p className='text-contact'>Contact</p>
                    <form ref={form} onSubmit={formik.handleSubmit}>
                        <input
                            type="email"
                            name="user_email"
                            placeholder="Enter your email here"
                            value={formik.values.user_email}
                            onChange={formik.handleChange}
                        />
                        {formik.touched.user_email && formik.errors.user_email ? (
                            <div className="error">{formik.errors.user_email}</div>
                        ) : null}
                    </form>

                    <p className="delivery">Delivery</p>
                    <form>
                        <input
                            type="text"
                            placeholder="Country/Region"
                            name="country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                        />
                        <div className="name">
                            <input
                                type="text"
                                placeholder="First name"
                                name="first_name"
                                className="input-checkout-left"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Last name"
                                name="last_name"
                                className="input-checkout-right"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                        />
                        <div className="name">
                            <input
                                type="text"
                                placeholder="City"
                                name="city"
                                className="input-checkout-left"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Post code"
                                name="post_code"
                                className="input-checkout-right"
                                value={formik.values.post_code}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </form>
                </div>

                <div className="checkout-cart">
                    {cart.map(item => (
                        <div className="checkout-item" key={item.id}>
                            <img src={item.image} alt="" />
                            <h5>{item.title}</h5>
                            <p className="price">$ {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}

                    <div className="discount">
                        <Button onClick={handleSpinWheel} disabled={spinning}>
                            {spinning ? "Spinning.." : "Discount Random"}
                        </Button>

                        {selectedDiscount && !spinning && (
                            <Alert variant="success" className="mt-3">
                                Congratulations! You have received a discount code: {selectedDiscount.type}
                            </Alert>
                        )}
                        {spinning && (
                            <div className="spinner-container">
                                <ClipLoader color="#f00" size={30} />
                            </div>
                        )}
                    </div>

                    <div className="total">
                        <h5>Total Spent: </h5>
                        <p>$ {discountedTotal}</p>
                    </div>

                    <Button onClick={handleCheckout} className="checkout-button mt-3">
                        Checkout
                    </Button>

                    <Modal show={showModal} onHide={handleClose} centered>
                        <Modal.Header closeButton className="modal-success-header">
                            <Modal.Title className="text-center w-100">Purchase Successful</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center">
                            <FaCheckCircle color="green" size={100} className="mb-3" />
                            <h4 className="mb-3">Thank you for your purchase!</h4>
                            <p>Your order has been successfully placed.</p>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </Container>
    );
};

export default Checkout;
