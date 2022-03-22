import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors } from '../../../reducers/adminProductsReducer';
import Loader from '../../layout/loader/Loader';
import { Button } from "@material-ui/core";
import { adminUpdateProductImagesAction } from '../../../actions/adminProductsAction';
import Sidebar from '../sidebar/SideBar';
import { ADMIN_UPDATE_PRODUCT_IMAGES_RESET } from '../../../constants/adminProductsConstants';
import { getProductDetails } from '../../../actions/productAction';
const AdminProductImagesUpdate = () => {
      const alert = useAlert()
      const { id } = useParams()
      const dispatch = useDispatch()
      const { product, loading, error } = useSelector((state) => state.productDetails)
      const { error: updateError, isUpdated,loading:upDating } = useSelector(state => state.adminUpdateproductImages)
      const [images, setImages] = useState([])
      const [imagesPreview, setImagesPreview] = useState([]);
      const updateProductSubmitHandler = (e) => {
            console.log(images)
            e.preventDefault();

            const myForm = new FormData();
            for (let i = 0; i <= images.length; i++) {
                  myForm.append("image", images[i])
                  console.log(images[i])
            }
            dispatch(adminUpdateProductImagesAction(id, myForm));
      };
      const updateProductImagesChange = (e) => {
            const files = Array.from(e.target.files);
            setImagesPreview([]);
            setImages(e.target.files)
            files.forEach((file) => {
                  const reader = new FileReader();
                  reader.onload = () => {
                        if (reader.readyState === 2) {
                              setImagesPreview((old) => [...old, reader.result]);
                        }
                  };
                  reader.readAsDataURL(file);
            });
      };
      useEffect(() => {
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors())
            }
            if (updateError) {
                  alert.error(updateError)
                  dispatch(clearErrors())
            }
            if (isUpdated) {
                  alert.success("Images Updated")
                  dispatch({type:ADMIN_UPDATE_PRODUCT_IMAGES_RESET})
            }
            dispatch(getProductDetails(id)) 
      },[dispatch,error,updateError,isUpdated,alert,id])

      return (
            <Fragment>
                  {
                        loading ? <Loader /> :
                              <Fragment>
                                    <div className='updateProduct'>
                                          <Sidebar />
                                          <div className='updateProductContainer'>
                                                <form action="" className='updateProductForm' encType="multipart/form-data" onSubmit={updateProductSubmitHandler}>
                                                      <h1>Update Product Images for {product.name}</h1>
                                                      <div id="createProductFormFile">
                                                            <input
                                                                  type="file"
                                                                  name="image"
                                                                  accept="image/*"
                                                                  onChange={updateProductImagesChange}
                                                                  multiple
                                                            />
                                                      </div>

                                                      <div id="updateProductFormImage">
                                                            {imagesPreview.map((image, index) => (
                                                                  <img key={index} src={image} alt="Product Preview" />
                                                            ))}
                                                      </div>

                                                      <Button
                                                            id="createProductBtn"
                                                            type="submit"
                                                            disabled={loading ? true : false}
                                                      >
                                                      {upDating?"Images Updating":"Update"}
                                                      </Button>

                                                </form>
                                          </div>

                                    </div>
                              </Fragment>
                  }

            </Fragment>
      )
};

export default AdminProductImagesUpdate;
