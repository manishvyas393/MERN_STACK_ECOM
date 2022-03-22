import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails } from '../../../actions/productAction';
import { clearErrors } from '../../../reducers/adminProductsReducer';
import Loader from '../../layout/loader/Loader';
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Sidebar from '../sidebar/SideBar';
import MetaData from '../../layout/MetaData';
import "./adminupdateproduct.css"
import { adminUpdateProductDetailAction } from '../../../actions/adminProductsAction';
import { ADMIN_UPDATE_PRODUCT_RESET } from '../../../constants/adminProductsConstants';

const AdminProductDetailsUpdate = () => {
      const alert = useAlert()
      const { id } = useParams()
      const dispatch = useDispatch()
      const { product, loading, error } = useSelector((state) => state.productDetails)
      const {isUpdated} = useSelector((state) => state.adminUpdateProductDetail)
      let [name, setName] = useState("");
      let [price, setPrice] = useState(null);
      let [description, setDescription] = useState("");
      let [category, setCategory] = useState("");
      let [Stock, setStock] = useState(null);


      const categories = [
            "Laptop",
            "Footwear",
            "Bottom",
            "Tops",
            "Attire",
            "Camera",
            "Jackets",
            "Mobiles",
      ];

      const updateProductSubmitHandler = (e) => {
            e.preventDefault();
            const myForm = new FormData();
            myForm.set("name", name);
            myForm.set("price", price);
            myForm.set("description", description);
            myForm.set("category", category);
            myForm.set("stock", Stock);
            if (price === null) {
                  myForm.set("price", price = product.price);
            }
            if (Stock === null) {
                  myForm.set("stock", Stock=product.stock);
            }
            if (category==="") {
                  myForm.set("category",category=product.category);
            }
            if (description === "") {
                  myForm.set("description", description= product.description);
            }
            if (name === "") {
                  myForm.set("name", name=product.name);
            }
            dispatch(adminUpdateProductDetailAction(id, myForm));
          
      };

      useEffect(() => {
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors())
            }
            if (isUpdated) {
                  alert.success("Product Updated")
                  dispatch({type:ADMIN_UPDATE_PRODUCT_RESET})
            }
            else {
                  dispatch(getProductDetails(id))
            }

      }, [id, dispatch, alert, error,isUpdated])

      return (
            <Fragment>
                  <MetaData title="ADMIN-UPDATE PRODUCT" />
                  {
                        loading ? <Loader /> :
                              <Fragment>
                                    <div className='updateProduct'>
                                          <Sidebar />
                                          <div className='updateProductContainer'>
                                                <form action="" className='updateProductForm' encType="multipart/form-data" onSubmit={updateProductSubmitHandler}>
                                                      <h1>Update Product Details for {product.name}</h1>
                                                      <div>
                                                            <SpellcheckIcon />
                                                            <input
                                                                  type="text"
                                                                  placeholder="Product Name"
                                                                  value={name}
                                                                  onChange={(e) => setName(e.target.value)}
                                                            />
                                                      </div>

                                                      <div>
                                                            <AttachMoneyIcon />
                                                            <input
                                                                  type="number"
                                                                  placeholder="Price"
                                                                  name="price"
                                                                  onChange={(e) => setPrice(e.target.value)}
                                                                  value={price}
                                                            />
                                                      </div>

                                                      <div>
                                                            <DescriptionIcon />

                                                            <textarea
                                                                  placeholder="Product Description"
                                                                  value={description}
                                                                  name="description"
                                                                  onChange={(e) => setDescription(e.target.value)}
                                                                  cols="30"
                                                                  rows="1"
                                                            ></textarea>
                                                      </div>

                                                      <div>
                                                            <AccountTreeIcon />
                                                            <select
                                                                  value={category}
                                                                  name='category'
                                                                  onChange={(e) => setCategory(e.target.value)}
                                                            >
                                                                  <option value="">Choose Category</option>
                                                                  {categories.map((cate) => (
                                                                        <option key={cate} value={cate}>
                                                                              {cate}
                                                                        </option>
                                                                  ))}
                                                            </select>
                                                      </div>

                                                      <div>
                                                            <StorageIcon />
                                                            <input
                                                                  type="number"
                                                                  name="stock"
                                                                  placeholder="Stock"
                                                                  onChange={(e) => setStock(e.target.value)}
                                                                  value={Stock}
                                                            />
                                                      </div>

                                                      <Button
                                                            id="createProductBtn"
                                                            type="submit"
                                                            disabled={loading ? true : false}
                                                      >
                                                            Update
                                                      </Button>

                                                </form>
                                          </div>

                                    </div>
                              </Fragment>
                  }
            </Fragment>
      )
};

export default AdminProductDetailsUpdate;
