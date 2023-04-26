import { useDispatch, useSelector } from "react-redux"
import Footer from "./global/Footer"
import Header from "./global/Header"
import { addOrder } from "../redux/slices/userSlice"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { resetCart } from "../redux/slices/cartSlice"

const OrderSummary = () => {
    const address = useSelector(state => state.cart.shippingAddress)
    const method = useSelector(state => state.cart.paymentMethod)
    const itemsCart = useSelector(state => state.cart.items)
    const user = useSelector(state => state.userSession.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let [res, setres] = useState(0)
    let i = 0

    const handleSubmit = () => {
        let total = 0
        itemsCart.forEach(item => total += item.details.price * item.quantity)

        let items = []
        items = itemsCart.map(item => {
            return { id: item.details.id, quantity: item.quantity }
        })
        items = JSON.stringify(items);

        let form = {
            items: items,
            street: address.street,
            city: address.city,
            postalCode: address.postalCode,
            country: address.country,
            name: address.name,
            email: user.email,
            paymentMethod: method,
            total: total
        }

        form = JSON.stringify(form)

        fetch('/api/user_session/create_order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: form
        }).then(res => res.json().then(response => {
            if (res.status === 500) { setres(500); return }
            itemsCart.forEach(item => localStorage.removeItem(item.details.id))
            dispatch(addOrder(response[0]))
            dispatch(resetCart())
            navigate(`/shop/order/${response[0].id}`)

        }))
    }

    return (
        <div className="fullpage">
            <Header location='shop' />
            <div id="orderMain">
                <div id="orderMainLeft">
                    <div>
                        <h3>Shipping Details</h3>
                        <h4>Name: {address.name}</h4>
                        <h4>Address: {address.street}, {address.city}, {address.postalCode}, {address.country}</h4>
                    </div>
                    <div>
                        <h3>Payment Method</h3>
                        <h4>{method}</h4>
                    </div>
                    <div>
                        <h3>Order Items</h3>
                        {itemsCart.map(item => {
                            return <div key={item.details.id} className="orderItems">
                                <h4>{item.details.product_name}</h4>
                                <h4>Amount: {item.quantity}</h4>
                                <h4>${item.details.price} x {item.quantity} = ${item.details.price * item.quantity}</h4>
                            </div>
                        })}
                    </div>
                </div>
                <div id="orderMainSummary">
                    <h3>Order Summary</h3>
                    <div><h4>Items </h4><h4>{itemsCart.forEach(product => { i += product.details.price * product.quantity })}${i}</h4></div>
                    <div><h4>Shipping </h4><h4>$0</h4></div>
                    <div><h4>Total </h4><h4>${i}</h4></div>
                    <button onClick={handleSubmit}>Place Order</button>
                    {res === 500 ? <h4>An error has occurred</h4> : null}
                </div>
            </div>
            <Footer />
        </div>
    )
}

const OrderPage = () => {
    const params = useParams()
    /* const [sdkReady, setSdkReady] = useState(false) */
    const orders = useSelector(state => state.userSession.orders)
    const user = useSelector(state => state.userSession.user)
    const order = orders.find(order => order.id === params.id)
    const itemsOrder = JSON.parse(order.items_json)
    const products = useSelector(state => state.products)
    let items = itemsOrder.map(item => {
        return products.find(product => product.id === item.id)
    })
    let i = 0;

    /*  useEffect(() => {
         fetch('/api/config/paypal').then(res => res.text()
         ).then(res => {
             const script = document.createElement('script')
             script.type = 'text/javascript'
             script.src = `https://www.paypal.com/sdk/js?client-id=${res}`
             script.async = true
             script.onload = () => {
                 setSdkReady(true)
             }
             document.body.appendChild(script)
         })
     }) */

    return (
        <div className="fullpage">
            <Header location='shop' />
            <div id="orderMain">
                <div id="orderMainLeft">
                    <h2>Order {order.id}</h2>
                    <div>
                        <h3>Shipping</h3>
                        <h4>Name: {user.fname + ' ' + user.lname}</h4>
                        <h4>Email: {user.email}</h4>
                        <h4>Address: {order.street}, {order.city}, {order.postalCode}, {order.country}</h4>
                        {order.status === 'Delivered'
                            ? <h4 className="status fullfilled">Status: Delivered</h4>
                            : <h4 className="status not_fullfilled">Status: Not Delivered</h4>
                        }
                    </div>
                    <div>
                        <h3>Payment Method</h3>
                        <h4>{order.payment_method}</h4>
                        {order.status === 'Paid' || order.status === 'Delivered'
                            ? <h4 className="status fullfilled">Status: Paid</h4>
                            : <h4 className="status not_fullfilled">Status: Not Paid</h4>
                        }
                    </div>
                    <div>
                        <h3>Order Items</h3>
                        {items.map(item => {
                            let quantity = itemsOrder.find(i => i.id === item.id).quantity
                            return <div key={item.id} className="orderItems">
                                <h4>{item.product_name}</h4>
                                <h4>Amount: {quantity}</h4>
                                <h4>${item.price} x {quantity} = ${item.price * quantity}</h4>
                            </div>
                        })}
                    </div>
                </div>
                <div id="orderMainSummary">
                    <h3>Order Total</h3>
                    <div><h4>Items </h4><h4>{items.forEach(product => { i += product.price * itemsOrder.find(i => i.id === product.id).quantity })}${i}</h4></div>
                    <div><h4>Shipping </h4><h4>$0</h4></div>
                    <div><h4>Total </h4><h4>${i}</h4></div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export { OrderSummary, OrderPage }