import { Link } from "react-router-dom"
import { removeProduct, setProductQnt } from "../../redux/slices/cartSlice"
import { useDispatch, useSelector } from "react-redux"

const CartProduct = ({ id }) => {
    const cartProducts = useSelector(state => state.cart.items)
    const product = cartProducts.find(item => item.details.id === id)
    const dispatch = useDispatch()

    return (
        <div className="cart-product">
            <Link to={`/shop/product/${product.details.id}`} state={{ from: "cart" }}><img src={product.details.image_url} alt={product.details.product_name} /></Link>
            <Link to={`/shop/product/${product.details.id}`} state={{ from: "cart" }}><h4>{product.details.product_name}</h4></Link>
            <h4>${product.details.price}</h4>
            <div className="inc-dec">
                <h4>Quantity:&nbsp;</h4>
                <div>
                    <img src="../images/Arrows/arrow1/arrow1.png" alt="arrow-up" onClick={() => {
                        if (product.details.count_in_stock === product.quantity) return
                        dispatch(setProductQnt({
                            id: product.details.id,
                            quantity: 1
                        }));
                        localStorage.setItem(product.details.id, parseInt(localStorage.getItem(product.details.id)) + 1);
                    }} />
                    <h4>{product.quantity}</h4>
                    <img src="../images/Arrows/arrow1/arrow1.png" alt="arrow-down" onClick={() => {
                        dispatch(setProductQnt({
                            id: product.details.id,
                            quantity: -1
                        }));
                        localStorage.setItem(product.details.id, localStorage.getItem(product.details.id) - 1);
                        if (localStorage.getItem(product.details.id) <= 0) localStorage.removeItem(product.details.id)
                    }} />
                </div>
            </div>
            <h4 onClick={() => {
                dispatch(removeProduct({ id: product.details.id }))
                localStorage.removeItem(product.details.id)
            }}>Delete Item</h4>
        </div>
    )
}

export default CartProduct