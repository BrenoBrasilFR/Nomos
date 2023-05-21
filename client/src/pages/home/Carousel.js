import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import CarouselItems from './CarouselItems.js';
import { useEffect } from "react";


function Carousel() {
    const products = useSelector(state => state.products)
    let array = []
    let i = 0;

    useEffect(() => {
        if (products.length !== 0) {
            if (document.getElementById('scriptHome1')) document.head.removeChild(document.getElementById('scriptHome1'))

            var scriptHome1 = document.createElement("script");
            scriptHome1.id = 'scriptHome1';
            scriptHome1.src = "javascript/carouselProducts.js";
            scriptHome1.defer = true;
            document.head.appendChild(scriptHome1);
        }
    }, [products])

    while (i < products.length) {
        if (!(products[i].product_name === 'Orion Gold' || products[i].product_name === 'Orion Silver')) {
            array.push(<CarouselItems product={products[i]} key={products[i].id} />)
        }
        i++
    }

    return (
        <div id="collection-div" data-aos={window.screen.width >= '915' ? 'fade-left' : 'fade-in'}>
            <Link to='/shop' id="our-watches"><h3>Our collection</h3><img src="images/seta.png" alt=""></img></Link>
            <div className="carousel">
                <button className="carousel-button prev"><img src="images/Arrows/arrow1/arrow1.png" alt=""></img></button>
                <button className="carousel-button next"><img src="images/Arrows/arrow1/arrow1.png" alt=""></img></button>
                <div className="carousel-dots"></div>
                <div className="loaderProducts"></div>
                {array}
            </div>
        </div>
    )
}

export default Carousel;