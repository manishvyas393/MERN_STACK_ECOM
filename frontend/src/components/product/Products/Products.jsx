import React, { Fragment, useEffect, useState } from 'react'
import "./products.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProducts } from "../../../actions/productAction"
import Loader from "../../layout/loader/Loader"
import ProductCard from "../../home/ProductCard"
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Slider from "@material-ui/core/Slider"
import { Typography } from '@material-ui/core'
import { useAlert } from 'react-alert'
import MetaData from '../../layout/MetaData'
const Products = () => {
      const categories = [
            "Laptop",
            "Footwear",
            "Bottom",
            "Tops",
            "Jeans",
            "Mobile",
            "Jackets",
            "Camera"
      ]
      const [currentPage, setCurrentPage] = useState(1)
      const [price, setPrice] = useState([0, 200000])
      const [category, setCategory] = useState("")
      const [ratings, setRatings] = useState(0)
      const dispatch = useDispatch()
      const { keyword } = useParams()
      const alert = useAlert()
      const { products, loading, error, productsCount, resultPerPage, filteredProducts } = useSelector(state => state.products)
      const setPageNo = (e) => {
            setCurrentPage(e)
      }
      const priceHandler = (e, newPrice) => {
            setPrice(newPrice)
            console.log(newPrice)
      }
      useEffect(() => {
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors())
            }
            dispatch(getProducts(keyword, currentPage, price, category, ratings))
      }, [dispatch, keyword, currentPage, price, category, ratings, alert, error])
      return (
            <Fragment>
                  {
                        loading ? <Loader /> : <Fragment>
                              <MetaData title="PRODUCTS" />
                              <h2 className="ProductsHeading">
                                    Our Products
                              </h2>
                              <div className="Products">
                                    {filteredProducts ?
                                          products.map(product => (
                                                <ProductCard product={product} key={product._id} />
                                          )) : (
                                                <div className='NoProducts'>
                                                      <h1>
                                                            No Products
                                                      </h1>
                                                </div>
                                          )}

                              </div>
                              <div className="filterBox">
                                    <Typography>Price</Typography>
                                    <Slider
                                          value={price}
                                          onChange={priceHandler}
                                          valueLabelDisplay='auto'
                                          aria-labelledby='range-slider'
                                          min={0}
                                          max={200000}
                                    />
                                    <Typography>Categories</Typography>
                                    <ul className="CategoryBox">
                                          {
                                                categories.map((category) => (
                                                      <li className='category-link' key={category} onClick={() => setCategory(category)}>
                                                            {category}
                                                      </li>
                                                ))
                                          }
                                    </ul>
                                    <fieldset>
                                          <Typography component="legend">Ratings Above</Typography>
                                          <Slider
                                                value={ratings}
                                                onChange={(e, newRating) => {
                                                      setRatings(newRating)
                                                }}
                                                aria-labelledby="continuos-slider"
                                                min={0}
                                                max={5}
                                                valueLabelDisplay='auto'
                                          />
                                    </fieldset>
                              </div>
                              {
                                    resultPerPage <= filteredProducts && (
                                          <div className="PaginationBox">
                                                <Pagination
                                                      activePage={currentPage}
                                                      itemsCountPerPage={resultPerPage}
                                                      totalItemsCount={productsCount}
                                                      onChange={setPageNo}
                                                      nextPageText="Next"
                                                      prevPageText="Previous"
                                                      firstPageText="1"
                                                      lastPageText="Last"
                                                      itemClass="page-item"
                                                      linkClass='page-link'
                                                      activeClass='pageItemActive'
                                                      activeLinkClass='pageLinkActive'
                                                />
                                          </div>
                                    )
                              }
                        </Fragment>
                  }
            </Fragment>
      )
}

export default Products
