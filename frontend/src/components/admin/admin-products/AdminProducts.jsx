import React, { Fragment, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from 'react-redux';
import SideBar from '../sidebar/SideBar'
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import "./adminproducts.css"
import { adminAllProductsAction, adminDeleteProductAction, clearErrors } from '../../../actions/adminProductsAction';
import MetaData from '../../layout/MetaData';
import { ADMIN_DELETE_PRODUCT_RESET } from '../../../constants/adminProductsConstants';
const AdminProducts = () => {
      const dispatch = useDispatch();
      const alert=useAlert()
      const { error, adminProducts } = useSelector(state => state.adminProducts);
      const {error:deleteError,isDeleted}=useSelector(state=>state.adminDeleteProduct)
      const deleteProduct = (id) => {
      dispatch(adminDeleteProductAction(id))
}
      useEffect(() => {
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors())
            }
            if (deleteError) {
                  alert.error(deleteError)
                  dispatch(clearErrors())
            }
            if (isDeleted) {
                  alert.success("Product Deleted Successfully")
                  dispatch({type:ADMIN_DELETE_PRODUCT_RESET})
            }
            dispatch(adminAllProductsAction())
      }, [dispatch,error,alert,isDeleted,deleteError])
      const columns = [
            { field: "id", headerName: "Product Id", minWidth: 200, flex: 0.5 },
            { field: "name", headerName: "Name", minWidth: 350, flex: 1 },
            { field: "stock", headerName: "Stock", type: "number", minWidth: 150, flex: 0.3 },
            { field: "price", headerName: "Price", type: "number", minWidth: 270, flex: 0.5 },
            {
                  field: "actions",
                  headerName: "Actions",
                  type: "number",
                  minWidth: 150,
                  flex: 0.3,
                  sortable: false,
                  renderCell: (params) => {
                        return (
                              <Fragment>
                                    <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                                          <EditIcon />
                                    </Link>
                                    <Button onClick={() => deleteProduct(params.getValue(params.id, "id"))}>
                                          <DeleteIcon />
                                    </Button>
                              </Fragment>
                        )
                  }
            },
      ];
      const rows = [];
      adminProducts && adminProducts.forEach((product) => {
            rows.push({
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  stock: product.stock
            })
      })
      return (
            <Fragment>
                  <MetaData title="Admin-All Products" />
                  <div className="adminAllProducts">
                        <SideBar />
                        <div className="productListContainer">
                              <h1 id="productListHeading">ALL PRODUCTS</h1>

                              <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={10}
                                    disableSelectionOnClick
                                    className="productListTable"
                                    autoHeight
                              />
                        </div>
                  </div>
            </Fragment>
      )
}
export default AdminProducts;
