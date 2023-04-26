
const OrderProgress = (props) => {
    return (
        <div id="orderProgress">
            <h4>Login</h4>
            {props.location === 'shipping' ? <h4 className="selected">Shipping</h4> : <h4>Shipping</h4>}
            {props.location === 'Payment' ? <h4 className="selected">Payment</h4> : <h4>Payment</h4>}
            {props.location === 'Order' ? <h4 className="selected">Place Order</h4> : <h4>Place Order</h4>}
        </div>
    )
}
export default OrderProgress