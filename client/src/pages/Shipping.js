import Header from "./global/Header"
import Footer from "./global/Footer"
import Country from "./profile/Country"
import Address from "./profile/Address"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setShippingAddress, setPaymentMethod } from "../redux/slices/cartSlice"
import { addAddress } from "../redux/slices/userSlice"

const Shipping = () => {
    let addresses = useSelector(state => state.userSession.addresses)
    let shippingAddress = useSelector(state => state.cart.shippingAddress)
    let user = useSelector(state => state.userSession.user)
    let [street, setstreet] = useState(shippingAddress.street)
    let [city, setcity] = useState(shippingAddress.city)
    let [postalCode, setpostalCode] = useState(shippingAddress.postalCode)
    let [country, setcountry] = useState(shippingAddress.country)
    let [name, setname] = useState(user.fname + ' ' + user.lname)
    let streetLS = localStorage.getItem('street')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        setstreet(localStorage.getItem('street'))
        setcity(localStorage.getItem('city'))
        setpostalCode(localStorage.getItem('postalCode'))
        setcountry(localStorage.getItem('country'))
    }, [streetLS])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (document.getElementById('saveCheckbox').checked) {

            let form = {
                street: street,
                city: city,
                postalCode: postalCode,
                country: country
            }

            form = JSON.stringify(form)

            fetch('/api/user_session/add_address', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: form
            }).then(res => res.json()).then(response => {
                dispatch(addAddress(response[0]))
            })
        }
        dispatch(setShippingAddress({
            name: name,
            street: street,
            city: city,
            postalCode: postalCode,
            country: country
        }))
        if (localStorage.getItem('street')) {
            localStorage.removeItem('name')
            localStorage.removeItem('street')
            localStorage.removeItem('city')
            localStorage.removeItem('postalCode')
            localStorage.removeItem('country')
        }
        localStorage.setItem('name', name)
        localStorage.setItem('street', street)
        localStorage.setItem('city', city)
        localStorage.setItem('postalCode', postalCode)
        localStorage.setItem('country', country)
        navigate('/shop/payment')
    }

    const selectAddress = (address) => {
        setstreet(address.street)
        setcity(address.city)
        setpostalCode(address.postalCode)
        setcountry(address.country)
    }

    return (
        <div className='fullpage' id="shippingPage">
            <Header location='shop' />
            <div id="shippingMain">
                <div id="shipping">
                    <h3>Shipping</h3>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="recipient-name">Recipient name</label>
                            <input type="text" id="recipient-name" name="recipient-name" onChange={e => setname(e.target.value)} value={name} required />
                        </div>
                        <div>
                            <label htmlFor="street-address">Street address</label>
                            <input type="text" id="street-address" name="street-address" onChange={e => setstreet(e.target.value)} value={street} required />
                        </div>
                        <div>
                            <label htmlFor="postal-code">ZIP or postal code</label>
                            <input type="text" id="postal-code" name="postal-code" onChange={e => setpostalCode(e.target.value)} value={postalCode} required />
                        </div>
                        <div>
                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city" onChange={e => setcity(e.target.value)} value={city} required />
                        </div>
                        <div>
                            <label htmlFor="country">Country or region</label>
                            <select id="country" name="country" onChange={e => setcountry(e.target.value)} value={country} required >
                                <Country />
                            </select>
                        </div>
                        <div id="saveAddress" >
                            <input type="checkbox" name="saveCheckbox" value='saveCheckbox' id="saveCheckbox" />
                            <label htmlFor="saveCheckbox">Save Address</label>
                        </div>
                    </form>
                </div>
                <button onClick={handleSubmit}>Continue</button>
                <div id="savedAddresses">
                    <h4>Saved addresses:</h4>
                    {addresses.map(address => {
                        return <div onClick={() => selectAddress(address)} className="shippingAddress" key={address.id}><Address address={address} /></div>
                    })}
                </div>
            </div>

            <Footer />
        </div>
    )
}

const Payment = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    let [paymentMethod, setMethod] = useState("PayPal")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (localStorage.getItem('paymentMethod')) {
            localStorage.removeItem('paymentMethod')
        }

        localStorage.setItem('paymentMethod', paymentMethod)

        dispatch(setPaymentMethod({ paymentMethod }))
        navigate('/shop/order_summary')
    }

    return (
        <div className='fullpage' id="paymentPage">
            <Header location='shop' />
            <div id="payment">
                <h3>Payment Method</h3>
                <div>
                    <h4>Select Method</h4>
                    <div>
                        <input type="radio" id="PayPal" name="paymentMethod" value='PayPal' defaultChecked onClick={e => setMethod(e.target.value)} />
                        <label htmlFor="PayPal">PayPal or Credit Card</label>
                    </div>
                </div>
                <button onClick={handleSubmit}>Continue</button>
            </div>
            <Footer />
        </div>
    )
}

export { Shipping, Payment }