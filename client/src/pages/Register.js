import Header from './global/Header';
import Footer from './global/Footer';
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationOn } from "../redux/slices/notificationSlice";
import { setUserInfo } from '../redux/slices/userSlice';

const Register = () => {
    let [fname, setfname] = useState("")
    let [lname, setlname] = useState("")
    let [email, setemail] = useState("")
    let [password, setpassword] = useState("")
    let [res, setres] = useState(0)
    let [param] = useSearchParams();
    let user = useSelector(state => state.userSession.user.email)
    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(() => {
        if (user && param.get('redirect') === 'shipping') { navigate('/shop/shipping') }
        else if (user) { navigate('/shop') }
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        fname = fname.trim()
        lname = lname.trim()
        fname = fname.charAt(0).toUpperCase() + fname.slice(1);
        lname = lname.charAt(0).toUpperCase() + lname.slice(1);

        let form = {
            first_name: fname,
            last_name: lname,
            email: email,
            password: password
        }

        form = JSON.stringify(form)

        fetch('/api/user_session/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: form
        }).then(res => res.json().then(response => {
            if (res.status === 409) { setres(400); return }
            else if (res.status === 500) { setres(500); return }
            dispatch(setUserInfo({
                fname: response.fname,
                lname: response.lname,
                email: response.email,
                admin: response.admin,
                accessToken: response.accessToken,
                addresses: response.addresses,
                orders: response.orders
            }))
            if (param.get('redirect') === 'shipping') { return } else { dispatch(setNotificationOn({ type: "logged" })); }
        }))
    }

    return (
        <div className='fullpage'>

            <Header location='shop' />
            <div className='form'>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend>Register</legend>
                        <div>
                            <label htmlFor="first_name">First name:&nbsp;&nbsp;</label>
                            <input type="text" id='first_name' name="first_name" maxLength='20' onChange={e => setfname(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="last_name">Last name:&nbsp;&nbsp;</label>
                            <input type="text" id='last_name' name="last_name" maxLength='20' onChange={e => setlname(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="email">Email:&nbsp;&nbsp;</label>
                            <input type="email" id='email' name="email" maxLength='35' onChange={e => setemail(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="password">Password:&nbsp;&nbsp;</label>
                            <input type="password" id='password' name="password" maxLength='30' minLength='5' onChange={e => setpassword(e.target.value)} required />
                        </div>
                        {res === 500
                            ? <h3>Sorry, a server error has occurred</h3>
                            : null}
                        {res === 409
                            ? <h3>An account registered with this email already exists</h3>
                            : null}
                        <button>Submit</button>
                    </fieldset>
                </form>
            </div>
            <Footer />

        </div>
    )
}

export default Register