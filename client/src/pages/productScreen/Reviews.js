import Rating from "../global/Rating"

const Reviews = ({ review }) => {
    return (
        <div className='review'>
            <div className="review_info">
                <h4>{review.user_name}</h4>
                <Rating value={review.rating} />
                <h4>{review.created_at.slice(0, 10)}</h4>
            </div>
            <h4>{review.review_text}</h4>
        </div>
    )
}

export default Reviews