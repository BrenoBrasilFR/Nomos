import { deleteAddress } from "../../redux/slices/userSlice"
import { useDispatch } from "react-redux"

const Address = (props) => {
    const dispatch = useDispatch()

    const deleteAdr = () => {
        fetch('/api/user_session/delete_address', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: props.address.id })
        })
        dispatch(deleteAddress({ id: props.address.id }))
    }

    return (
        <div id="address">
            <div id="inner-address">
                <div className="address-div">
                    <h3>Street</h3>
                    <h3>{props.address.street}</h3>
                </div>
                <div className="address-div">
                    <h3>City</h3>
                    <h3>{props.address.city}</h3>
                </div>
                <div className="address-div">
                    <h3>Postal Code</h3>
                    <h3>{props.address.postalCode}</h3>
                </div>
                <div className="address-div">
                    <h3>Country</h3>
                    <h3>{props.address.country}</h3>
                </div>
            </div>

            {props.location === 'profile'
                ? <button onClick={deleteAdr}>Delete Address</button>
                : null
            }

        </div>
    )
}
export default Address