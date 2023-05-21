import Header from './global/Header'
import Footer from './global/Footer'
import CartMain from './cart/CartMain'
import { useEffect } from 'react'

const Cart = () => {

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
            <CartMain />
            <Footer />
        </div>
    )
}

export default Cart