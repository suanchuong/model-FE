import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Global/Header/Header';
import Footer from './components/Global/Footer/Footer';
import Home from './components/Page/Home/Home';
import ListProduct from './components/Page/ListProduct/ListProduct';
import Detail from './components/Page/Detail/Detail';
import Shopping from './components/Page/Shopping/Shopping';
import Checkout from './components/Page/Checkout/Checkout';

  
function App() {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Product' element={<ListProduct />} />
        <Route path="/Product/:id" element={<Detail />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/shopping" element={<Shopping />} />
        <Route path="/checkout" element={<Checkout />} />
        
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;
