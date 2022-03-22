import React, { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom"
import MetaData from "../../layout/MetaData"
import "./search.css"
const Search = () => {
      const [keyword, setkeyword] = useState("")
      const Navigate=useNavigate()
      const searchSubmitHandler = (e) => {
            e.preventDefault();
            if (keyword.trim()) {
                  console.log(keyword)
            Navigate(`/products/${keyword}`)
            } else {
                  Navigate('/products')
            }
            console.log(keyword)
      }
      return (
            <Fragment>
                  <MetaData title="SEARCH PRODUCT"/>
                  <form action="" className="searchBox" onSubmit={searchSubmitHandler}>
                        <input type="text" name="" id="" placeholder='Search A Product' onChange={(e) => setkeyword(e.target.value)} />
                        <input type="submit" value="Search" />
                  </form>
          </Fragment>
      )
}

export default Search
