import { useState, useEffect, useCallback } from 'react';

const useFetch = (url) => {

    const [product, setProduct] = useState([]);
    const getProduct = useCallback(async () => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setProduct(data);
        } catch (error) {
            alert(Error);
        }
    }, [url]);

    useEffect(() => {
        getProduct();
    }, [getProduct]);

    return product
};

export default useFetch;