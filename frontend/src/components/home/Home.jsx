import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import ProductCard from './ProductCard'
import "./home.css"
import MetaData from '../layout/MetaData'
import { getProducts } from "../../actions/productAction"
import { useDispatch, useSelector } from "react-redux"
import Loader from '../layout/loader/Loader'
import {useAlert} from "react-alert"
const Home = () => {
      const alert=useAlert()
      const disptach = useDispatch()
      const { loading, error, products,} = useSelector(state => state.products)
      useEffect(() => {
            if (error) {
                  return alert.error(error)
            }
            disptach(getProducts())
      }, [disptach,error,alert])
      return (
            <Fragment>
                  {
                        loading ? (<Loader />) :
                              (
                                    <Fragment>
                                          <MetaData title="E-Commerce" />
                                          <div className="banner">
                                                <p>Welcome To Ecommerce</p>
                                                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                                                <a href="#container">
                                                      <button>
                                                            Scroll<CgMouse />
                                                      </button>
                                                </a>
                                          </div>
                                          <h2 className="homeHeading">Featured Product</h2>
                                          <div className="container" id='container' >
                                                {
                                                      products && products.map(product => (
                                                            <ProductCard product={product} key={product._id} />
                                                      ))
                                                }

                                          </div>
                                    </Fragment>
                              )
                  }

            </Fragment>


      )
}

export default Home
