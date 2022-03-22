import React, { Fragment, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductDetails,clearErrors} from '../../../actions/productAction';
import { useAlert } from 'react-alert';
import "./options.css"
const AdminUpdateProuctOptions = () => {
      const alert=useAlert()
      const dispatch=useDispatch()
      const { id } = useParams()
      const { product,error } = useSelector((state) => state.productDetails)
      useEffect(() => {
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors())
            }
            else {
                  dispatch(getProductDetails(id))
            }

      }, [id, dispatch, alert, error])
      return (
            <Fragment>
                  <div className="updateOptions">
                        <Sidebar />
                        <div className="updateProductContainer">
                        
                                    <Link to={`/admin/updateproduct/details/${product._id}`}>
                                          <button className='btn'>
                                                Update Details
                                          </button>
                                    </Link>
                              
                                    <Link to={`/admin/updateproduct/images/${product._id}`}>
                                          <button className='btn'>
                                                Update Images
                                          </button>
                                    </Link>

                           
                           
                        </div>
                  </div>
            </Fragment>
      )
};

export default AdminUpdateProuctOptions;
