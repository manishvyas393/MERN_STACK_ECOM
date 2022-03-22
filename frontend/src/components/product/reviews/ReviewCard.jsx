import React from 'react'
import { Rating } from "@material-ui/lab";
import ProfileImg from "../../../images/Profile.png"
import "./reviewcard.css"
const ReviewCard = ({ review }) => {
      const options = {
            size: "large",
            value: review.rating,
            readOnly: true,
            precision: 0.5
      }
      return (
            <div className='ReviewCard' key={review._id}>
                  <img src={ProfileImg} alt="User" />
                  <p>{review.name}</p>
                  <Rating {...options} />
                  <span className="reviewCardComment">{review.comment}</span>
            </div>
      )
}

export default ReviewCard
