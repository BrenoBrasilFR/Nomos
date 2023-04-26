import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNotificationOn } from "../../redux/slices/notificationSlice";
import { removeUser } from "../../redux/slices/userSlice";

function DeleteAccountAlert() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function alertDisplayNone() {
        const alert = document.querySelector('.alert-div');
        alert.style.display = 'none';
    }

    function deleteAccount() {
        fetch('/api/user_session/delete_account').then(res => {
            switch (res.status) {
                case 200:
                    navigate('/shop')
                    dispatch(removeUser())
                    break;
                case 500:
                    const alert = document.querySelector('.alert-div');
                    alert.style.display = 'none';
                    dispatch(setNotificationOn({ type: 'deleteError' }))
                    break;
                default:
            }
        })
    }

    return (
        <div className="alert-div">
            <div className="alert-box alert-box-delete">
                <h2>Are you sure you want to delete your account?</h2>
                <button onClick={deleteAccount}>Yes</button>
                <button onClick={alertDisplayNone}>No</button>
            </div>
        </div>
    )
}

export default DeleteAccountAlert;