import Header from './global/Header';
import Slide from './global/Slide';
import ProductsShop from './shop/ProductsShop';
import Footer from './global/Footer';
import Notification from './shop/Notification';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Shop() {
    const notification = useSelector((state) => state.notification)

    useEffect(() => {
        var scriptHome1 = document.querySelector('#scriptHome1');
        var scriptHome2 = document.querySelector('#scriptHome2');
        var scriptShop = document.querySelector('#scriptShop1');

        if (scriptHome1) document.head.removeChild(scriptHome1);
        if (scriptHome2) document.head.removeChild(scriptHome2);
        if (scriptShop) document.head.removeChild(scriptShop);

        var scriptShop1 = document.createElement("script");
        scriptShop1.id = 'scriptShop1';
        scriptShop1.src = "javascript/slideRelease.js";
        scriptShop1.defer = true;
        document.head.appendChild(scriptShop1);
    });

    return (
        <>
            {(notification.on) ? <Notification /> : null}
            <Header location='shop' />
            <Slide location='shop' />
            <ProductsShop location='shop' />
            <Footer />
        </>
    )
}

export default Shop;