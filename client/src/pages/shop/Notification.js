import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setNotificationOff } from "../../redux/slices/notificationSlice"

const Notification = () => {
    const notification = useSelector((state) => state.notification)
    const dispatch = useDispatch();

    useEffect(() => {
        var notif = document.querySelector('.notif-div');
        notif.style.opacity = '1';

        setTimeout(() => notif.style.opacity = '0', 2800)
        setTimeout(() => dispatch(setNotificationOff()), 3300)
    })

    const type = () => {
        if (notification.type === 'added') {
            return <h3>Item added to cart</h3>

        } else if (notification.type === 'logged') {
            return <h3>Successfully Logged In</h3>

        } else if (notification.type === 'registered') {
            return <h3>Successfully Registered</h3>

        } else if (notification.type === 'deleteError') {
            return <h3>An error has occurred</h3>
        }
    }

    return (
        <div className="notif-div">
            {type()}
        </div>
    )
}

export default Notification