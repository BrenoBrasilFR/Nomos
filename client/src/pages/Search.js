import Header from './global/Header';
import Footer from './global/Footer';
import ProductsShop from './shop/ProductsShop';
import Notification from './shop/Notification';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


function Search() {
    const [searchParams] = useSearchParams();
    const notification = useSelector((state) => state.notification)

    useEffect(() => {
        var scriptHome1 = document.querySelector('#scriptHome1');
        var scriptHome2 = document.querySelector('#scriptHome2');
        var scriptShop1 = document.querySelector('#scriptShop1');
        if (scriptHome1) document.head.removeChild(scriptHome1);
        if (scriptHome2) document.head.removeChild(scriptHome2);
        if (scriptShop1) document.head.removeChild(scriptShop1);
    })

    return (
        <>

            {(notification.on) ? <Notification /> : null}
            <Header location='shop' />
            <ProductsShop location='search' param={searchParams} />
            <Footer />

        </>
    )
}

export default Search;