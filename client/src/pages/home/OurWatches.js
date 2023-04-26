import { Link } from "react-router-dom";

function OurWatches() {
    return (
        <div data-aos='fade-in' className="our-watches-div">
            <Link to='/shop' id="our-watches" className="our-watches-sections"><h3>Our watches</h3><img src="images/seta.png" alt="" /></Link>
            <h4>Select our products by category</h4>
            <div id="products">
                <div id="product-4" className="product our-watches"><div className="img-container">
                    <Link to={`/shop/search?tag=mens`} ><img src="images/4.PNG" alt="Watch 4"></img></Link>
                </div><Link to={`/shop/search?tag=mens`}><h4>For Him</h4></Link></div>
                <div id="product-3" className="product our-watches"><div className="img-container">
                    <Link to={`/shop/search?tag=womens`} ><img src="images/3.PNG" alt="Watch 3"></img></Link>
                </div><Link to={`/shop/search?tag=womens`}><h4>For Her</h4></Link></div>
                <div id="product-1" className="product our-watches"><div className="img-container">
                    <Link to={`/shop/search?tag=unisex`} ><img src="images/orion-gold2.jpg" alt="Watch 1"></img></Link>
                </div><Link to={`/shop/search?tag=unisex`}><h4>Unisex</h4></Link></div>
                <div id="product-2" className="product our-watches"><div className="img-container">
                    <Link to={`/shop/search?tag=best_sellers`} ><img src="images/2.PNG" alt="Watch 2"></img></Link>
                </div><Link to={`/shop/search?tag=best_sellers`}><h4>Best Sellers</h4></Link></div>
            </div>
        </div>
    )
}

export default OurWatches;