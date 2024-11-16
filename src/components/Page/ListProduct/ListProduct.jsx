import React, { useState, useEffect } from 'react';
import ReactSlider from 'react-slider';
import './ListProduct.css';
import Cart from '../../Global/Cart/Cart';
import Pagination from 'react-bootstrap/Pagination';
import useFetch from '../../../hooks/useFetch';
import { useLocation } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const ListProduct = () => {
    const products = useFetch('https://672dbfbdfd89797156438317.mockapi.io/listProduc-');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedRatio, setSelectedRatio] = useState('');
    const [priceRange, setPriceRange] = useState([10, 900]);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 16;
    const location = useLocation();

    //Lấy đúng category và status trên thanh header khi bấm vào Product và Shop
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSelectedCategory(params.get("category") || '');
        setSelectedStatus(params.get("status") || '');
    }, [location.search]);

    //Hàm lọc filter
    const filteredProducts = products.filter(item => {
        const categoryMatch = selectedCategory ? item.film.toLowerCase() === selectedCategory.toLowerCase() : true;
        const statusMatch = selectedStatus ? item.status.trim().toLowerCase() === selectedStatus.toLowerCase() : true;
        const ratioMatch = selectedRatio ? item.ratio === selectedRatio : true;
        //Xét giá mặc định về true ngay cả khi không thay đổi thanh filter
        const priceMatch = (priceRange && priceRange.length === 2 && (priceRange[0] !== 10 || priceRange[1] !== 900))
            ? item.price >= priceRange[0] && item.price <= priceRange[1]
            : true;
        return categoryMatch && statusMatch && ratioMatch && priceMatch;
    });

    //Hàm chia page
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginationItems = Array.from({ length: totalPages }, (_, i) => (
        <Pagination.Item
            key={i + 1}
            active={i + 1 === currentPage}
            onClick={() => setCurrentPage(i + 1)}
        >
            {i + 1}
        </Pagination.Item>
    ));

    //Hàm reset lại filter
    const resetFilters = () => {
        setLoading(true); 
        setSelectedCategory('');
        setSelectedStatus('');
        setSelectedRatio('');
        setPriceRange([10, 900]);
        setCurrentPage(1);
        setLoading(false); 
    };

    //Hàm loading khi chọn filter time out 0.5s
    const applyFilters = () => {
        setLoading(true); 
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    return (
        <div className="list">
            <div className="filter">
                <div className="head">
                    <p className='fill'>
                        <i className="fa-solid fa-filter"></i> Filter
                    </p>
                    <button onClick={resetFilters} className="reset-filters">Reset Filters</button>
                </div>

                {/* Product Category Filter */}
                <div className="category">
                    <h3>Product Category</h3>
                    <ul className="list-cate">
                        <li
                            onClick={() => { setSelectedCategory('Dragon Ball'); applyFilters(); }}
                            className={selectedCategory === 'Dragon Ball' ? 'active' : ''}>
                            <i className="fa-brands fa-modx"></i> Dragon Ball
                        </li>
                        <li
                            onClick={() => { setSelectedCategory('Naruto Shippuden'); applyFilters(); }}
                            className={selectedCategory === 'Naruto Shippuden' ? 'active' : ''}>
                            <i className="fa-brands fa-modx"></i> Naruto Shippuden
                        </li>
                        <li
                            onClick={() => { setSelectedCategory('Kimetsu'); applyFilters(); }}
                            className={selectedCategory === 'Kimetsu' ? 'active' : ''}>
                            <i className="fa-brands fa-modx"></i> Kimetsu
                        </li>
                        <li
                            onClick={() => { setSelectedCategory('One Piece'); applyFilters(); }}
                            className={selectedCategory === 'One Piece' ? 'active' : ''}>
                            <i className="fa-brands fa-modx"></i> One Piece
                        </li>
                    </ul>
                </div>

                {/* Filter By Status */}
                <div className="category">
                    <h3>Filter By Status</h3>
                    <ul className="list-cate">
                        <li
                            onClick={() => { setSelectedStatus('Available'); applyFilters(); }}
                            className={selectedStatus === 'Available' ? 'active' : ''}>
                            <i className="fa-brands fa-modx"></i> Available
                        </li>
                        <li
                            onClick={() => { setSelectedStatus('Request'); applyFilters(); }}
                            className={selectedStatus === 'Request' ? 'active' : ''}>
                            <i className="fa-brands fa-modx"></i> Place A Request
                        </li>
                        <li
                            onClick={() => { setSelectedStatus('2Hand'); applyFilters(); }}
                            className={selectedStatus === '2Hand' ? 'active' : ''}>
                            <i className="fa-brands fa-modx"></i> 2Hand
                        </li>
                    </ul>
                </div>

                {/* Filter By Ratio */}
                <div className="category">
                    <h3>Filter By Ratio</h3>
                    <ul className="list-cate">
                        <li
                            onClick={() => { setSelectedRatio('1/1'); applyFilters(); }}
                            className={selectedRatio === '1/1' ? 'active' : ''}>
                            <i className="fa-brands fa-modx"></i> 1/1
                        </li>
                        <li
                            onClick={() => { setSelectedRatio('1/3'); applyFilters(); }}
                            className={selectedRatio === '1/3' ? 'active' : ''}>
                            <i className="fa-brands fa-modx"></i> 1/3
                        </li>
                        <li
                            onClick={() => { setSelectedRatio('1/4'); applyFilters(); }}
                            className={selectedRatio === '1/4' ? 'active' : ''}>
                            <i className="fa-brands fa-modx"></i> 1/4
                        </li>
                        <li
                            onClick={() => { setSelectedRatio('1/6'); applyFilters(); }}
                            className={selectedRatio === '1/6' ? 'active' : ''}>
                            <i className="fa-brands fa-modx"></i> 1/6
                        </li>
                        <li
                            onClick={() => { setSelectedRatio('1/7'); applyFilters(); }}
                            className={selectedRatio === '1/7' ? 'active' : ''}>
                            <i className="fa-brands fa-modx"></i> 1/7
                        </li>
                    </ul>
                </div>

                {/* Filter By Price */}
                <div className="category">
                    <h3>Filter By Price</h3>
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        value={priceRange}
                        onChange={setPriceRange}
                        min={0}
                        max={1500}
                        step={5}
                        ariaLabel={['Lower thumb', 'Upper thumb']}
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                        pearling
                        minDistance={10}
                    />
                </div>
            </div>

            {/* Loading Indicator */}
            {loading && (
                <div className="loading-overlay">
                    <Spinner animation="border" variant="danger" />
                </div>
            )}

            {!loading && (
                <div className="list-cart">
                    <div className="box-cart">
                        {currentProducts.length > 0 ? (
                            currentProducts.map((item) => (
                                <Cart
                                    id={item.id}
                                    key={item.id}
                                    image={item.image}
                                    title={item.title}
                                    price={item.price}
                                    size={item.size}
                                    ratio={item.ratio}
                                    status={item.status}
                                />
                            ))
                        ) : (
                            <p>No products found</p>
                        )}
                    </div>
                </div>
            )}
            <div className="pagination-container">
                <Pagination>{paginationItems}</Pagination>
            </div>
        </div>
    );
};

export default ListProduct;
