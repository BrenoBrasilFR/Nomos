import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Search from './pages/Search';
import ProductScreen from './pages/ProductScreen';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { Shipping, Payment } from './pages/Shipping';
import { OrderSummary, OrderPage } from './pages/Order';
import NotFound from './pages/NotFound';
import ScrollToTop from './pages/global/ScrollToTop';
import AOS from 'aos';
import { useDispatch } from 'react-redux';
import { setProducts, productRating } from './redux/slices/productsSlice';
import { addProduct, setShippingAddress, setPaymentMethod } from './redux/slices/cartSlice';
import { setCategories } from './redux/slices/categoriesSlice';
import { setUserInfo } from './redux/slices/userSlice';
import 'aos/dist/aos.css';
import './styles/export';
import { setReviews } from './redux/slices/reviewsSlice';

function Aos() {
  AOS.init({
    duration: 1500,
    once: true,
  });
};

Aos();

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const setCart = ({ payload }) => {
      let highestId = 0;
      let array = [];

      payload.forEach(product => {
        if (product.id > highestId) highestId = product.id
      })

      for (let i = 0; i <= highestId; i++) {
        if (localStorage.getItem(i)) {
          array.push([i, parseInt(localStorage.getItem(i))])
        }
      }

      for (let i = 0; i < array.length; i++) {
        let product = payload.find(item => item.id === array[i][0])

        dispatch(addProduct({
          details: product,
          quantity: array[i][1]
        }))
      }
    }

    fetch('/api/products')
      .then((res) => res.json())
      .then((res) => dispatch(setProducts(res)))
      .then((res) => setCart(res))

  }, [dispatch])

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((res) => dispatch(setCategories(res)))
  }, [dispatch])

  useEffect(() => {
    fetch('/api/product_reviews')
      .then((res) => res.json())
      .then((res) => {
        dispatch(setReviews(res))
        res.forEach(review => {
          dispatch(productRating({ rating: review.rating, id: review.product_id }))
        })
      })
  }, [dispatch])

  useEffect(() => {
    fetch('/api/token')
      .then((res) => res.json())
      .then((res) => {
        if (res.email === undefined && window.location.pathname === '/shop/profile') {
          window.location.href = '/shop';
        } else if (res.email === undefined) {
          return
        } else {
          dispatch(setUserInfo({
            fname: res.fname,
            lname: res.lname,
            email: res.email,
            admin: res.admin,
            accessToken: res.accessToken,
            addresses: res.addresses,
            orders: res.orders
          }))
        }
      })
  }, [dispatch])

  useEffect(() => {
    fetch('/api')
      .then((res) => console.log(res))
  }, [])

  useEffect(() => {
    if (localStorage.getItem('street')) {
      dispatch(setShippingAddress({
        street: localStorage.getItem('street'),
        city: localStorage.getItem('city'),
        postalCode: localStorage.getItem('postalCode'),
        country: localStorage.getItem('country')
      }))
    }
    if (localStorage.getItem('paymentMethod')) {
      dispatch(setPaymentMethod({ paymentMethod: localStorage.getItem('paymentMethod') }))
    }
  })

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/shop/product/:id' element={<ProductScreen />} />
        <Route path='/shop/search' element={<Search />} />
        <Route path='/shop/cart' element={<Cart />} />
        <Route path='/shop/login' element={<Login />} />
        <Route path='/shop/register' element={<Register />} />
        <Route path='/shop/profile' element={<Profile />} />
        <Route path='/shop/shipping' element={<Shipping />} />
        <Route path='/shop/payment' element={<Payment />} />
        <Route path='/shop/order_summary' element={<OrderSummary />} />
        <Route path='/shop/order/:id' element={<OrderPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
