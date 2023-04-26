import Header from "./global/Header"
import Footer from "./global/Footer"
import UpdateUser from "./profile/UpdateUser"
import Orders from "./profile/Orders"
import Addresses from "./profile/Addresses"
import DeleteAccountAlert from "./profile/DeleteAccountAlert"
import Notification from "./shop/Notification"
import { useSelector } from "react-redux"

const Profile = () => {
    const notification = useSelector((state) => state.notification)

    return (
        <div id="profilePage">
            <Header location='shop' />
            <DeleteAccountAlert />
            {(notification.on) ? <Notification /> : null}
            <div id="profile">
                <div id="innerProfile">
                    <Addresses />
                    <Orders />
                </div>
                <UpdateUser />
            </div>
            <Footer />
        </div>
    )
}
export default Profile