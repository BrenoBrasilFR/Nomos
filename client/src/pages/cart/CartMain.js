import { useSelector } from "react-redux"
import CartProduct from "./CartProducts"
import { useNavigate } from "react-router-dom"

const CartMain = () => {
    const cartProducts = useSelector(state => state.cart)
    const user = useSelector(state => state.userSession.user)
    const navigate = useNavigate()
    let i = 0;

    const checkoutHandler = () => {
        if (!user.email) navigate('/shop/login?redirect=shipping')
        else navigate('/shop/shipping')
    }

    return (
        <div className="cart-main">
            <div className="shopping-cart">
                <h3>{
                    cartProducts.items.length === 0 ? "Your Cart Is Empty" : "Shopping Cart"
                }</h3>
                {
                    cartProducts.items.map(product => (
                        <CartProduct key={product.details.id} id={product.details.id} />
                    ))
                }
            </div>
            {
                cartProducts.items.length === 0
                    ? null
                    : <div className="subtotal">
                        <h3>Subtotal {cartProducts.quantityItems} Items</h3>
                        <h3>{cartProducts.items.forEach(product => { i += product.details.price * product.quantity })}${i}</h3>
                        <h5 onClick={checkoutHandler}>Proceed To Checkout</h5>
                    </div>

            }

        </div>
    )
}

export default CartMain