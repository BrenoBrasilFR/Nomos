import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = ({ type }) => {
    const user = useSelector(state => state.userSession.user)

    if (type === 'loggedOut') {
        return user.fname !== undefined ? <Outlet /> : <Navigate to='/shop/login' />;
    } else if (type === 'loggedIn') {
        return user.fname === undefined ? <Outlet /> : <Navigate to='/shop' />;
    }
}
export default ProtectedRoutes