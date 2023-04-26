import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Order = ({ order }) => {
    const navigate = useNavigate()

    const orderPage = () => {
        navigate(`/shop/order/${order.id}`)
    }

    return (
        <div className="order">
            <div>
                <h3>Order ID: </h3><h3>{order.id}</h3>
            </div>
            <div>
                <h3>Date: </h3><h3>{order.created_at.slice(0, 10)}</h3>
            </div>
            <div>
                <h3>Total: </h3><h3>${order.total}</h3>
            </div>
            <div>
                <h3>Status: </h3><h3>{order.status}</h3>
            </div>
            <button onClick={orderPage}>Go to order page</button>
        </div>
    )
}

const Orders = () => {
    let orders = useSelector(state => state.userSession.orders)

    return (
        <div id="orders">
            <h3>My Orders</h3>
            {orders.map(order => {
                return <Order order={order} key={order.id} />
            })}
        </div>
    )
}
export default Orders