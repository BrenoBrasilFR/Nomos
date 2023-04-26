import { useEffect } from 'react';
import Footer from './global/Footer';
import Header from './global/Header';
import ProductScreenMain from './productScreen/ProductScreenMain';

function ProductScreen() {

    useEffect(() => {
        var scriptHome1 = document.querySelector('#scriptHome1');
        var scriptHome2 = document.querySelector('#scriptHome2');
        var scriptShop1 = document.querySelector('#scriptShop1');
        if (scriptHome1) document.head.removeChild(scriptHome1);
        if (scriptHome2) document.head.removeChild(scriptHome2);
        if (scriptShop1) document.head.removeChild(scriptShop1);
    })

    return (
        <div className='fullpage'>

            <Header location='shop' />
            <ProductScreenMain />
            <Footer />

        </div>
    )
}

export default ProductScreen;