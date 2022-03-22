import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MetaData from "../../layout/MetaData"
import Loader from "../../layout/loader/Loader"
import "./profile.css"
const Profile = () => {
      const user = JSON.parse(localStorage.getItem("user"))
      const { loading } = useSelector(state => state.user)
      return (
            <Fragment>
                  {
                        loading ? <Loader /> : <Fragment>
                              <MetaData title={`${user.name}'s-PROFILE`} />
                              <div className="ProfileContainer">
                                    <div>
                                          <h1>My Profile</h1>
                                          <img src={user && user.avatar.url} alt={user.name} />
                                          <Link to="/editprofile">Edit Profile</Link>
                                    </div>
                                    <div>
                                          <div>
                                                <h4>Full Name</h4>
                                                <p>{user.name}</p>
                                          </div>
                                          <div>
                                                <h4>Email</h4>
                                                <p>{user.email}</p>
                                          </div>
                                          <div>
                                                <h4>Joined On</h4>
                                                <p>{String(user.createdAt).substring(0, 10)}</p>
                                          </div>

                                          <div>
                                                <Link to="/myorders">My Orders</Link>
                                                <Link to="/password/update">Change Password</Link>
                                          </div>

                                    </div>

                              </div>

                        </Fragment>
                  }
            </Fragment>


      )
}

export default Profile
