import React, { Fragment, useEffect, useState } from 'react'
import Carousel from "react-material-ui-carousel"
import "./productDetail.css"
import { clearErrors, getProductDetails, newReview } from "../../../actions/productAction"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import ReviewCard from '../reviews/ReviewCard'
import Loader from "../../layout/loader/Loader"
import { useAlert } from "react-alert"
import MetaData from '../../layout/MetaData'
import { addItemsToCart } from '../../../actions/cartAction'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@material-ui/core"
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from '../../../constants/productConstants'
const ProductDetail = () => {
      const alert = useAlert()
      const dispatch = useDispatch()
      const { success, error: reviewError } = useSelector(state => state.newReview);
      const [quantity, setQuantity] = useState(1);
      const [rating, setRating] = useState(0);
      const [comment, setComment] = useState("");
      const [open, setOpen] = useState(false);
      const { product, loading, error } = useSelector((state) => state.productDetails)
      const { isAuthenticated } = useSelector((state) => state.user)
      const { id } = useParams()


      const options = {
            size: "large",
            value: product.ratings,
            readOnly: true,
            precision: 0.5
      }
      const increaseQuantity = () => {
            if (product.stock <= quantity) return;

            const qty = quantity + 1;
            setQuantity(qty);
      };

      const decreaseQuantity = () => {
            if (1 >= quantity) return;

            const qty = quantity - 1;
            setQuantity(qty);
      };
      const submitReviewToggle = () => {
            open ? setOpen(false) : setOpen(true);
      };
      const reviewSubmitHandler = () => {
            const myForm = new FormData();

            myForm.set("rating", rating);
            myForm.set("comment", comment);
            myForm.set("productId", id);

            dispatch(newReview(myForm));

            setOpen(false);
      };
      const addToCartHandler = () => {
            if (isAuthenticated) {
                  dispatch(addItemsToCart(id, quantity))
                  alert.success("Item Added To Cart")
            }
            else {
                  alert.error("please login to add item in cart")
            }
      };
      useEffect(() => {
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors())
            }
            if (reviewError) {
                  alert.error(reviewError)
                  dispatch(clearErrors())
            }

            if (success) {
                  alert.success("Review Submitted Successfully");
                  dispatch({ type: NEW_REVIEW_RESET });
            }
            dispatch(getProductDetails(id))
      }, [dispatch, id, error, alert, reviewError, success]);
      return (
            <Fragment>
                  {
                        loading ? (<Loader />) : (

                              <Fragment key={product.id}>
                                    <MetaData title={product.name} />
                                    <div className="ProductDetails" >
                                          <div>
                                                <Carousel>
                                                      {
                                                            product.images && product.images.map((item, i) => (
                                                                  <img src={item.url} alt={`${i} Slide`} key={item.url} className="CarouselImage" />
                                                            ))
                                                      }
                                                </Carousel>

                                          </div>
                                          <div>
                                                <div className="detailBlock-1">
                                                      <h2>{product.name}</h2>
                                                      <p>Product#{product._id}</p>
                                                </div>
                                                <div className="detailBlock-2">
                                                      <Rating {...options} />
                                                      <span>({product.numOfReviews} reviews)</span>
                                                </div>
                                                <div className="detailBlock-3">
                                                      <h1>&#8377;{product.price}</h1>
                                                      <div className="detailBlock-3-1">
                                                            <div className="detailBlock-3-1-1">
                                                                  <button onClick={decreaseQuantity}>-</button>
                                                                  <input type="number" readOnly value={quantity} />
                                                                  <button onClick={increaseQuantity}>+</button>
                                                            </div>
                                                            <button onClick={addToCartHandler} disabled={product.stock<1?true:false}>Add To Cart</button>
                                                      </div>
                                                      <p>
                                                            Status:
                                                            <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                                                  {
                                                                        product.stock < 1 ? "Out Of Stock" : `In Stock (${product.stock})`
                                                                  }
                                                            </b>
                                                      </p>
                                                </div>
                                                <div className="detailBlock-4">
                                                      Description:<p>{product.description}</p>
                                                </div>
                                                <button className='submitReview' onClick={submitReviewToggle}>Submit Review</button>
                                          </div>

                                    </div>

                                    <h3 className="ReviewsHeading">REVIEWS</h3>
                                    <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle} >
                                          <DialogTitle>Submit Review</DialogTitle>
                                          <DialogContent className='submitDialog'>
                                                <Rating onChange={(e) => setRating(e.target.value)} value={rating} size="large" />
                                                <textarea
                                                      className='submitDialogTextArea'
                                                      cols="30"
                                                      rows="5"
                                                      value={comment}
                                                      onChange={(e) => setComment(e.target.value)}
                                                >
                                                </textarea>
                                          </DialogContent>
                                          <DialogActions>
                                                <Button onClick={submitReviewToggle} color="secondary">
                                                      Cancel
                                                </Button>
                                                <Button onClick={reviewSubmitHandler} color="primary">
                                                      Submit
                                                </Button>
                                          </DialogActions>

                                    </Dialog>
                                    {
                                          product.reviews && product.reviews[0] ? (
                                                <div className="reviews">
                                                      {
                                                            product.reviews &&
                                                            product.reviews.map((review) => (
                                                                  <ReviewCard review={review} />
                                                            ))
                                                      }
                                                </div>
                                          ) : (
                                                <p className="noReviews">No Reviews Yet</p>
                                          )}
                              </Fragment>
                        )
                  }
            </Fragment>
      )
}

export default ProductDetail