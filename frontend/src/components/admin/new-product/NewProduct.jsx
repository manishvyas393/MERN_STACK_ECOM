import React, { Fragment, useEffect } from 'react';
import "./newproduct.css"
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "../sidebar/SideBar";
import MetaData from "../../layout/MetaData"
import { useState } from 'react';
import { adminNewProductAction, clearErrors } from '../../../actions/adminProductsAction';
import { ADMIN_NEW_PRODUCT_RESET } from '../../../constants/adminProductsConstants';
const NewProduct = () => {
      const dispatch = useDispatch();
      const alert = useAlert();
      const [name, setName] = useState("")
      const [price, setPrice] = useState(0)
      const [description, setDescription] = useState("");
      const [category, setCategory] = useState("");
      const [Stock, setStock] = useState(0);
      const [images, setImages] = useState(null);
      const [imagesPreview, setImagesPreview] = useState([]);
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
      const { error, isCreated,loading} = useSelector(state => state.adminNewProduct)
      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearErrors());
            }

            if (isCreated) {
                  alert.success("Product Created Successfully");
                  dispatch({ type: ADMIN_NEW_PRODUCT_RESET });
            }
      }, [dispatch, alert, error, isCreated]);
      const createProductSubmitHandler = (e) => {
            console.log(images)
            e.preventDefault();

            const myForm = new FormData();

            myForm.set("name", name);
            myForm.set("price", price);
            myForm.set("description", description);
            myForm.set("category", category);
            myForm.set("stock", Stock);
            for (let i = 0; i <= images.length; i++) {
                  myForm.append("image", images[i])
                  console.log(images[i])
            }
            dispatch(adminNewProductAction(myForm));
      };

      const createProductImagesChange = (e) => {
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
      return (
            <Fragment>
                  <MetaData title="Create Product" />
                  <div className="adminNewProduct">
                        <SideBar />
                        <div className="newProductContainer">
                              <form className='createProductForm' encType='multipart/form-data' onSubmit={createProductSubmitHandler}>
                                    <h1>Create Product</h1>
                                    <div>
                                          <SpellcheckIcon />
                                          <input type="text" name='name' placeholder='Product name' onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div>
                                          <AttachMoneyIcon />
                                          <input type="number" name='price' placeholder='Product price' onChange={(e) => setPrice(e.target.value)} />
                                    </div>
                                    <div>
                                          <DescriptionIcon />
                                          <textarea
                                                placeholder='Product Description'
                                                name="description"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                cols="30"
                                                rows="1"
                                          />
                                    </div>
                                    <div>
                                          <AccountTreeIcon />
                                          <select onChange={(e) => setCategory(e.target.value)}>
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
                                                placeholder="Stock"
                                                required
                                                onChange={(e) => setStock(e.target.value)}
                                          />
                                    </div>

                                    <div id="createProductFormFile">
                                          <input
                                                type="file"
                                                name="image"
                                                accept="image/*"
                                                onChange={createProductImagesChange}
                                                multiple
                                          />
                                    </div>
                                    <div id="createProductFormImage">
                                          {imagesPreview.map((image, index) => (
                                                <img key={index} src={image} alt="Product Preview" />
                                          ))}
                                    </div>

                                    <Button
                                          id="createProductBtn"
                                          type="submit"
                                    >
                                          {
                                                loading?"Creating...":"Create"
                                    }
                                    </Button>

                              </form>
                        </div>
                  </div>
            </Fragment>
      )
};

export default NewProduct;
