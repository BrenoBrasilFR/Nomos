import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { removeUser } from "../../redux/slices/userSlice";

function Header(props) {
    const cartQuantity = useSelector(state => state.cart.quantityItems)
    const userLogged = useSelector(state => state.userSession)
    const [searchInput, setInput] = useState('')
    const history = useNavigate()
    const dispatch = useDispatch()

    function alertDisplay() {
        const alert = document.querySelector('.alert-div');
        alert.style.display = 'flex';
    }

    function toggleDropdown() {
        const dropdown = document.querySelector('#dropdown');
        dropdown.classList.toggle('dropdown-show');
    }

    function navigate(event) {
        if (searchInput === '') return
        if (event.key === 'Enter' || event.type === 'click') history(`/shop/search?search_query=${searchInput}`)
    }

    function logout() {
        dispatch(removeUser())
        fetch('/api/user_session/logout').then(() => history('/shop'))
    }

    if (props.location === 'home') {

        return (
            <section id="header" className="header-home" style={{ opacity: '0' }}>
                <div id="inner-header">
                    <div id="brand">
                        <img src="/images/logo.png" alt="Nomos Glashutte" data-aos="fade-right"></img>
                    </div>
                    <nav id="navbar">
                        <ul id="navbar-list" data-aos="fade-left">
                            <li id="navbar-shop"><Link to='/shop'>Shop</Link></li>
                        </ul>
                    </nav>
                </div>
                <button className="header-note" onClick={alertDisplay} data-aos="fade-left">Note</button>
            </section>
        )

    } else if (props.location === 'shop') {

        return (
            <section id="header" className="header-scrolled header-shop">
                <div id="inner-header" className="inner-header-shop">
                    <div id="brand">
                        <Link to='/'><img src="/images/logo.png" alt="Nomos Glashutte"></img></Link>
                        <div id="search-bar">
                            <input
                                type="text"
                                placeholder="Search Products"
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={navigate}
                            ></input>
                            <span onClick={navigate}><i className="fas fa-search"></i></span>
                        </div>
                    </div>
                    <nav id="navbar">
                        <ul id="navbar-list">
                            <li id="navbar-home"><Link to='/'>Home</Link></li>
                            <li id="navbar-shop"><Link to='/shop'>Shop</Link></li>
                            <li id="navbar-cart"><Link to='/shop/cart'>
                                <div className="nav-cart-div">Cart&nbsp;<i className="fas fa-shopping-cart" />&nbsp;</div></Link>
                                {cartQuantity !== 0 ? <Link to='/shop/cart' id="cart-num-link"><h3 className="nav-cart-num">{cartQuantity}</h3></Link> : null}
                            </li>
                            {Object.keys(userLogged.user).length !== 0
                                ? <>
                                    <li id="navbar-user" onClick={toggleDropdown} data-dropdown ><h3><div>
                                        {userLogged.user.fname + " " + userLogged.user.lname}
                                    </div></h3><i className="fas fa-chevron-down"></i></li>
                                    <div id="dropdown" data-dropdown>
                                        <ul>
                                            <li id="dropdown-item1"><Link to='/shop/profile'><div>Profile</div></Link></li>
                                            <li id="dropdown-item3"><Link onClick={logout}><div>Log Out</div></Link></li>
                                        </ul>
                                    </div>
                                </>
                                : <>
                                    <li><Link to='/shop/login'>Login</Link></li>
                                    <li><Link to='/shop/register'>Register</Link></li>
                                </>
                            }

                        </ul>
                    </nav>
                </div>
            </section>
        )
    }
}



export default Header;
