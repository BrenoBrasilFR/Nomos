import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, setProductQnt } from "../../redux/slices/cartSlice";
import { setNotificationOn } from "../../redux/slices/notificationSlice";

function Product(props) {
    const dispatch = useDispatch()
    const cartProducts = useSelector((state) => state.cart.items)
    let rating = 0;
    let numReviews = 0;

    if (props.product.rating !== null) {
        rating = Math.round((props.product.rating[0] / props.product.rating[1]) * 10) / 10
        numReviews = props.product.rating[1]
    }

    const setOpacityProduct = () => {
        var productsShop = document.querySelector('#productsShop')
        productsShop.style.opacity = '1';
    }

    return (
        <div className="productShop">
            <Link to={`/shop/product/${props.product.id}`} state={{ from: "shop" }} className="productLink">
                <div className="imgDiv">
                    <img src={props.product.image_url} alt={props.product.product_name} onLoad={setOpacityProduct}></img>
                </div>
            </Link>
            <Link to={`/shop/product/${props.product.id}`} state={{ from: "shop" }} className="productLink productTitle">
                <h2>{props.product.product_name}</h2>
            </Link>
            <div className="rating">
                <h4>{rating} stars from {numReviews} reviews</h4>
            </div>
            <div className="price">
                <h4>${props.product.price}</h4>
            </div>
            <div className="addToCart">
                {props.product.count_in_stock !== 0
                    ? <button onClick={() => {
                        if (cartProducts.find(product => product.details.id === props.product.id)) {
                            dispatch(setProductQnt({
                                id: props.product.id,
                                quantity: 1
                            }));
                            localStorage.setItem(props.product.id, parseInt(localStorage.getItem(props.product.id)) + 1)
                        } else {
                            dispatch(addProduct({
                                details: props.product,
                                quantity: 1
                            }));
                            localStorage.setItem(props.product.id, 1)
                        }
                        dispatch(setNotificationOn({ type: "added" }))
                    }}
                    ><i className="fas fa-shopping-cart"></i> Add to Cart </button>
                    : <button disabled className="disabled-button"><i className="fas fa-shopping-cart"></i> Not Available </button>}
            </div>
        </div>
    )
}

export default Product;