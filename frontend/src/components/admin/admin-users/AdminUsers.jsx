import React, { Fragment, useEffect } from 'react';
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from 'react-redux';
import SideBar from '../sidebar/SideBar'
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import { adminDeleteUserAction, clearErrors, getAdminAllUser } from '../../../actions/adminAllUsersAction'
import MetaData from '../../layout/MetaData';
import { ADMIN_DELETE_USER_RESET } from '../../../constants/adminUsersConstants';
import "./adminusers.css"
const AdminUsers = () => {
      const dispatch = useDispatch()
      const alert = useAlert()
      const navigate=useNavigate()
      const { allUsers,error } = useSelector(state => state.adminAllUsers)
      const { error: deleteError, isDeleted } = useSelector(state => state.adminDeleteUser)
      const deleteUser = (id) => {
            dispatch(adminDeleteUserAction(id))
      }
      useEffect(() => {
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors)
            }
            if (deleteError) {
                  alert.error(deleteError)
                  dispatch(clearErrors)
            }
            if (isDeleted) {
                  alert.success("user deleted")
                  dispatch({ type: ADMIN_DELETE_USER_RESET })
                  navigate("/admin/dashboard")
                  
            }
            dispatch(getAdminAllUser())
      },[dispatch,alert,deleteError,isDeleted,error,navigate])
      const columns = [
            { field: "id", headerName: "User Id", minWidth: 200, flex: 0.5 },
            { field: "name", headerName: "Name", minWidth: 300, flex: 0.5},
            { field: "email", headerName: "Email", minWidth: 250, flex: 0.3 },
            { field: "role", headerName: "Role", type: "number", minWidth: 50, flex: 0.5 },
            {
                  field: "actions",
                  headerName: "Actions",
                  type: "number",
                  minWidth: 150,
                  flex: 0.2,
                  sortable: false,
                  renderCell: (params) => {
                        return (
                              <Fragment>
                                    <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
                                          <EditIcon />
                                    </Link>
                                    <Button onClick={() => deleteUser(params.getValue(params.id,"id"))}>
                                          <DeleteIcon />
                                    </Button>
                              </Fragment>
                        )
                  }
            },
      ];
      const rows = [];
     allUsers && allUsers.forEach((user) => {
            rows.push({
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  role: user.role
            })
      })
      return (
            <Fragment>
                  <MetaData title="Admin-All Users" />
                  <div className="adminAllUsers">
                        <SideBar />
                        <div className="userListContainer">
                              <h1 id="userListHeading">ALL USERS</h1>

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
};

export default AdminUsers;
