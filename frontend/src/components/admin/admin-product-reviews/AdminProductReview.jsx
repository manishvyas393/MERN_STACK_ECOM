import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Sidebar from "../sidebar/SideBar";
import "./adminproductreview.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Star from "@material-ui/icons/Star";
import { adminDeleteProductReviewAction, adminGetProductReviewAction, clearErrors } from "../../../actions/adminProductsAction";
import { ADMIN_DELETE_PRODUCT_REVIEW_RESET } from "../../../constants/adminProductsConstants";
const AdminProductReview = () => {
      const alert=useAlert()
      const dispatch = useDispatch()
      const{isDeleted,error:deleteError}=useSelector(state=>state.adminDeleteReview)
      const { reviews, loading,error } = useSelector(state => state.adminProductReviews)
      const [productId, setProductId] = useState("");
      const productReviewsSubmitHandler = (e) => {
            e.preventDefault();
            dispatch(adminGetProductReviewAction(productId));
      };
      const deleteReview = (reviewId) => {
            dispatch(adminDeleteProductReviewAction(productId, reviewId))
      }
      const columns = [
            { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

            {
                  field: "user",
                  headerName: "User",
                  minWidth: 200,
                  flex: 0.6,
            },

            {
                  field: "comment",
                  headerName: "Comment",
                  minWidth: 350,
                  flex: 1,
            },

            {
                  field: "rating",
                  headerName: "Rating",
                  type: "number",
                  minWidth: 180,
                  flex: 0.4,

                  cellClassName: (params) => {
                        return params.getValue(params.id, "rating") >= 3
                              ? "greenColor"
                              : "redColor";
                  },
            },

            {
                  field: "actions",
                  flex: 0.3,
                  headerName: "Actions",
                  minWidth: 150,
                  type: "number",
                  sortable: false,
                  renderCell: (params) => {
                        return (
                              <Fragment>
                                    <Button
                                          onClick={() =>
                                                deleteReview(params.getValue(params.id, "id"))
                                          } >
                                                <DeleteIcon />
                                    </Button>
                              </Fragment >
                        );
                  },
            },
      ];

const rows = [];

reviews &&
      reviews.forEach((item) => {
            rows.push({
                  id: item._id,
                  rating: item.rating,
                  comment: item.comment,
                  user: item.name,
            });
      });

useEffect(() => {
      if (productId.length === 24) {
            dispatch(adminGetProductReviewAction(productId));
      }
      if (error) {
            alert.error(error)
            dispatch(clearErrors())
      }
      if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
      }
      if (isDeleted) {
            alert.success("Review Deleted")
            dispatch({type:ADMIN_DELETE_PRODUCT_REVIEW_RESET})
      }
}, [productId, dispatch,alert,isDeleted,error,deleteError])
return (
      <Fragment>
            <MetaData title={`ALL REVIEWS - Admin`} />

            <div className="dashboard">
                  <Sidebar />
                  <div className="productReviewsContainer">
                        <form
                              className="productReviewsForm"
                              onSubmit={productReviewsSubmitHandler}
                        >
                              <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

                              <div>
                                    <Star />
                                    <input
                                          type="text"
                                          placeholder="Product Id"
                                          required
                                          value={productId}
                                          onChange={(e) => setProductId(e.target.value)}
                                    />
                              </div>

                              <Button
                                    id="createProductBtn"
                                    type="submit"
                                    disabled={
                                          loading ? true : false || productId === "" ? true : false
                                    }
                              >
                                    Search
                              </Button>
                        </form>

                        {reviews && reviews.length > 0 ? (
                              <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={10}
                                    disableSelectionOnClick
                                    className="productListTable"
                                    autoHeight
                              />
                        ) : (
                              <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                        )}
                  </div>
            </div>
      </Fragment>
);
};

export default AdminProductReview;
