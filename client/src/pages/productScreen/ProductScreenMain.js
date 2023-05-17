import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, setProductQnt } from '../../redux/slices/cartSlice';
import { addReview } from '../../redux/slices/reviewsSlice';
import { productRating } from '../../redux/slices/productsSlice';
import Reviews from './Reviews';

function ProductScreenMain() {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const reviewsState = useSelector(state => state.reviews)
    const cartProducts = useSelector((state) => state.cart.items)
    const user = useSelector((state) => state.userSession.user)
    let reviews = [];
    let Rating = 0;
    let i = 0;

    reviewsState.forEach(review => {
        if (review.product_id === Number(params.id)) reviews.push(review)
    })

    if (reviews.length !== 0) {
        reviews.forEach(review => {
            i += review.rating
        })

        Rating = Math.round((i / reviews.length) * 10) / 10
    }


    useEffect(() => {
        fetch(`/api/products/${params.id}`).then((res) => res.json()).then((res) => setProduct(res[0]))
    }, [params.id])

    const setOpacityPS = () => {
        var PSmain = document.querySelector('#PSmain');
        PSmain.style.opacity = '1';
    }

    const addedFunc = () => {
        document.querySelector('.added').style.opacity = '1'
        setTimeout(() => document.querySelector('.added').style.opacity = '0', 2200)
    }

    const toggleReview = (type) => {
        if (type === true) {
            document.querySelector('#addReview').style.display = 'none'
            document.querySelector('#leaveReview').style.display = 'flex'
        } else if (type === false) {
            document.querySelector('#addReview').style.display = 'flex'
            document.querySelector('#leaveReview').style.display = 'none'
        }
    }

    const submitReview = (e) => {
        e.preventDefault()

        let form = {
            product_id: product.id,
            text: comment,
            name: user.fname + ' ' + user.lname,
            rating: rating
        }

        form = JSON.stringify(form)

        fetch('/api/user_session/create_review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: form
        })
            .then((res) => res.json().then((response) => {
                switch (res.status) {
                    case 200:
                        document.getElementById('comment').value = ''
                        document.getElementById('rating').value = ''
                        toggleReview(false)
                        dispatch(productRating({ rating: response[0].rating, id: response[0].product_id }))
                        dispatch(addReview(response[0]))
                        break;
                    case 500:
                        break;
                    default:
                }
            }))
    }

    return (
        <section id='PSmain' style={{ opacity: 0 }} data-aos='fade' data-aos-duration='1000'>
            <div onClick={() => navigate('/shop')} id='PSbutton'>Back to Shop</div>
            <div id='PSfirstDiv'>
                <img src={product.image_url} id='PSimage' alt='' onLoad={setOpacityPS}></img>
                <div id='PSsecondDiv'>
                    <h2>{product.product_name}</h2>
                    <hr></hr>
                    <h3>{Rating} stars from {reviews.length} reviews</h3>
                    <hr></hr>
                    <h3>Price: ${product.price}</h3>
                    <hr></hr>
                    <h3>{product.description}</h3>
                </div>
                <div id='PSthirdDiv'>
                    <div>
                        <h3>Price: ${product.price}</h3>
                    </div>
                    <div>
                        {product.count_in_stock === 0
                            ? <h3>Not In Stock</h3>
                            : <div id='quantity'><h3>Quantity: </h3>
                                <div className='inc-dec'>
                                    <div style={{ margin: '0 10px' }}>
                                        <img src="../images/Arrows/arrow1/arrow1.png" alt="arrow-up" onClick={() => {
                                            if (product.count_in_stock === quantity) return
                                            setQuantity(quantity + 1)
                                        }} />
                                        <h4>{quantity}</h4>
                                        <img src="../images/Arrows/arrow1/arrow1.png" alt="arrow-down" onClick={() => {
                                            if (quantity === 1) return
                                            setQuantity(quantity - 1)
                                        }} />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div>
                        {product.count_in_stock !== 0 ? <button onClick={() => {
                            if (cartProducts.find(item => item.details.id === product.id)) {
                                dispatch(setProductQnt({
                                    id: product.id,
                                    quantity: quantity
                                }));
                                localStorage.setItem(product.id, parseInt(localStorage.getItem(product.id)) + parseInt(quantity))
                            } else {
                                dispatch(addProduct({
                                    details: product,
                                    quantity: quantity
                                }));
                                localStorage.setItem(product.id, quantity)
                            }
                            addedFunc()
                        }}>Add To Cart</button> : null}
                    </div>
                    <h4 className='added'>Item Added To Cart</h4>
                </div>
            </div>
            <div id='PSreviews'>
                <h1>Reviews</h1>
                <div id="addReview" onClick={() => toggleReview(true)}>
                    <div id="plus"><div id="div1"></div><div id="div2"></div></div>
                    <h3>Leave a review</h3>
                </div>
                <div id='leaveReview'>
                    <div id="closeDropdown" onClick={() => toggleReview(false)}><div id="div1"></div><div id="div2"></div></div>
                    <form onSubmit={submitReview}>
                        <div>
                            <label htmlFor="rating">Rating&nbsp;&nbsp;</label>
                            <select id="rating" name="rating" onChange={e => setRating(e.target.value)} required >
                                <option></option>
                                <option value="1">1 - Poor</option>
                                <option value="2">2 - Fair</option>
                                <option value="3">3 - Good</option>
                                <option value="4">4 - Very Good</option>
                                <option value="5">5 - Excellent</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="comment">Comment&nbsp;&nbsp;</label>
                            <textarea type="text" id='comment' name="comment" maxLength='500' onChange={e => setComment(e.target.value)} required />
                        </div>
                        {user.admin === 1
                            ? <button>Submit</button>
                            : user.admin === 0
                                ? <h3>Your account is not authorized to leave reviews</h3>
                                : <h3>Please log in with an authorized account to leave a review</h3>
                        }

                    </form>
                </div>
                {reviews.map(review => {
                    return <Reviews review={review} key={review.id} />
                })}
            </div>
        </section>
    )
}

export default ProductScreenMain;