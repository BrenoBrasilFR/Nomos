import { Link } from "react-router-dom";

const CarouselItems = ({ product }) => {

    if (product.product_name === 'Ludwig' || product.product_name === 'Lambda') {
        return <div className="carousel-item">
            <Link to={`/shop/product/${product.id}`} state={{ from: "home" }}>
                <img src={`images/collection/${product.product_name}.jpg`} alt={product.product_name}></img><h4>{product.product_name}</h4>
            </Link>
        </div>
    } else {
        return <div className="carousel-item">
            <Link to={`/shop/product/${product.id}`} state={{ from: "home" }}>
                <img src={`images/collection/${product.product_name}.PNG`} alt={product.product_name} /><h4>{product.product_name}</h4>
            </Link>
        </div>
    }
}

export default CarouselItems