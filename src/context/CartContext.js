import { createContext, useContext, useState } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(localStorage.getItem("CART") ? JSON.parse(localStorage.getItem("CART")) : []);

    const handleAddCart = (product) => {
        const newCart = [...cart];
        const checkIndex = cart.findIndex((item) => item.id === product.id);
        if (checkIndex >= 0) {
            newCart[checkIndex].quantity += product.quantity;
        } else {
            product.quantity = 1;
            newCart.push(product);
        }

        console.log('Updated cart:', newCart);
        setCart(newCart);
        localStorage.setItem("CART", JSON.stringify(newCart));
    };

    const handleRemove = (id) => {
        const newCart = cart.filter(item => item.id !== id);
        setCart(newCart);
        localStorage.setItem("CART", JSON.stringify(newCart));
    };

    const handleQuantity = (productId, type) => {
        const newCart = [...cart];
        const productIndex = newCart.findIndex((item) => item.id === productId);

        if (productIndex !== -1) {
            if (type === 'plus') {
                newCart[productIndex].quantity++;
            } else if (type === 'minus') {
                if (newCart[productIndex].quantity > 1) {
                    newCart[productIndex].quantity--;
                }
            } else if (type === 'delete') {
                newCart.splice(productIndex, 1);
            }
            setCart(newCart);
            localStorage.setItem("CART", JSON.stringify(newCart));
        }
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("CART");
    };

    return (
        <CartContext.Provider value={{ cart, handleAddCart, handleQuantity, handleRemove, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

const UseCart = () => {
    return useContext(CartContext);
};

export { CartProvider, UseCart };
