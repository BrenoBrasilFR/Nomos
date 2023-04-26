import Header from './global/Header';
import Footer from './global/Footer';
import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationOn } from "../redux/slices/notificationSlice";
import { setUserInfo } from '../redux/slices/userSlice';

const Login = () => {
    let [email, setemail] = useState("")
    let [password, setpassword] = useState("")
    let [res, setres] = useState(0)
    let user = useSelector(state => state.userSession.user.email)
    let [param] = useSearchParams();
    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(() => {
        if (user && param.get('redirect') === 'shipping') { navigate('/shop/shipping') }
        else if (user) { navigate('/shop') }
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        let form = {
            email: email,
            password: password
        }

        form = JSON.stringify(form)

        fetch('/api/user_session/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: form
        }).then(res => res.json().then(response => {
            if (res.status === 400) { setres(400); return }
            else if (res.status === 401) { setres(401); return }
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
                        <legend>Login</legend>
                        <div>
                            <label htmlFor="email">Email:&nbsp;&nbsp;</label>
                            <input type="email" id='email' name="email" maxLength='35' onChange={e => setemail(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="password">Password:&nbsp;&nbsp;</label>
                            <input type="password" id='password' name="password" maxLength='30' onChange={e => setpassword(e.target.value)} required />
                        </div>
                        {res === 400
                            ? <h3>An account registered with this email does not exist</h3>
                            : null}
                        {res === 401
                            ? <h3>Incorrect password</h3>
                            : null}
                        {res === 500
                            ? <h3>Sorry, a server error has occurred</h3>
                            : null}
                        <button>Login</button>
                    </fieldset>
                </form>
                <div id='loginRegisterDiv'>
                    <h3>Don't have an account? </h3>
                    {param.get('redirect') === 'shipping'
                        ? <Link to='/shop/register?redirect=shipping'>Click here to register</Link>
                        : <Link to='/shop/register'>Click here to register</Link>}

                </div>
            </div>
            <Footer />

        </div>
    )
}

export default Login