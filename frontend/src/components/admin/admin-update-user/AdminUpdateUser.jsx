import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { adminGetUserDetailAction, adminUpdateUserDetailAction, clearErrors } from '../../../actions/adminAllUsersAction';
import MetaData from "../../layout/MetaData"
import SideBar from "../sidebar/SideBar"
import { useAlert } from 'react-alert';
import { ADMIN_UPDATE_USER_RESET } from '../../../constants/adminUsersConstants';
import Loader from "../../layout/loader/Loader"
import "./adminupdateuser.css"
const AdminUpdateUser = () => {
      const { adminRequestedUser, error, loading } = useSelector(state => state.adminUserRequestedDetail)
      const { loading: upDating, isUpdated, error: updateError } = useSelector(state => state.adminUserDetailUpdate)
      const { id } = useParams()
      const alert = useAlert()
      const dispatch = useDispatch()
      const [name, setName] = useState("")
      const [email, setEmail] = useState("")
      const [role, setRole] = useState("");
      const updateDetailFormSubmit = (e) => {
            e.preventDefault();

            const myForm = new FormData();

            myForm.set("name", name);
            myForm.set("email", email);
            myForm.set("role", role);

            dispatch(adminUpdateUserDetailAction(adminRequestedUser._id, myForm));
      }
      useEffect(() => {
            if (updateError) {
                  alert.error(updateError)
                  dispatch(clearErrors())
            }
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors())
            }
            if (isUpdated) {
                  alert.success("User Updated")
                  dispatch({ type: ADMIN_UPDATE_USER_RESET })
            }
            dispatch(adminGetUserDetailAction(id))
      }, [dispatch, id, isUpdated, updateError, alert, error])
      return (
            <Fragment>
                  <MetaData title="Admin-Update User" />
                  {
                        loading ? <Loader /> :
                              <Fragment>
                                    <div className="updateUserContainer">
                                          <SideBar />
                                          <form className='form' onSubmit={updateDetailFormSubmit}>
                                                <h1>Update User { adminRequestedUser.name}</h1>
                                                <div>
                                                      <PersonIcon />
                                                      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                                                </div>
                                                <div>
                                                      <MailOutlineIcon />
                                                      <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                                <div>
                                                      <VerifiedUserIcon />
                                                      <select name='role' value={role} onChange={(e) => setRole(e.target.value)}>
                                                            <option value="">Choose Role</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="user">User</option>
                                                      </select>
                                                </div>

                                                <Button
                                                      id="updateProductBtn"
                                                      type="submit"
                                                      disabled={
                                                            upDating ? true : false || role === "" ? true : false
                                                      }
                                                >
                                                      Update
                                                </Button>
                                          </form>
                                    </div>

                              </Fragment>
                  }



            </Fragment>
      )
};

export default AdminUpdateUser;
