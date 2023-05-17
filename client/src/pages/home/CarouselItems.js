import { Link } from "react-router-dom";

const CarouselItems = ({ product }) => {

    return <div className="carousel-item">
        <Link to={`/shop/product/${product.id}`} state={{ from: "home" }}>
            <img src={product.image_url} alt={product.product_name}></img><h4>{product.product_name}</h4>
        </Link>
    </div>

}

export default CarouselItems