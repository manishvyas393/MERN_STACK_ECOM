import { Face, MailOutline } from '@material-ui/icons'
import React, { Fragment, useEffect, useState } from 'react'
import Loader from "../../layout/loader/Loader"
import { useNavigate } from 'react-router-dom'
import { clearErrors, updateUserProfile } from '../../../actions/userProfileAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import profile from "../../../images/Profile.png"
import { loadUser } from "../../../actions/userActions"
import { UPDATE_PROFILE_RESET } from '../../../constants/userProfileConstants'
import "./updateProfile.css"
const UpdateProfile = () => {
      const dispatch = useDispatch();
      const alert = useAlert();
      const navigate = useNavigate();
      const user = JSON.parse(localStorage.getItem("user"))
      const { error, isUpdated, loading } = useSelector(state => state.ProfileUpdate)

      const [name, setName] = useState(user.name);
      const [email, setEmail] = useState(user.email)
      const [avatar, setAvatar] = useState(profile);
      const [avatarPreview, setAvatarPreview] = useState(profile);

      const UpdateProfileSubmit = (e) => {
            e.preventDefault();
            const updateForm = new FormData();
            updateForm.set("name", name);
            updateForm.set("email", email);
            updateForm.set("avatar", avatar)
            dispatch(updateUserProfile(updateForm))
      }
      useEffect(() => {
            if (user) {
                  setName(user.name)
                  setEmail(user.email)
                  setAvatarPreview(user.avatar.url)
            }
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors())
            }
            if (isUpdated) {
                  alert.success("Profile Updated")
                  dispatch(loadUser())
                  navigate("/account")
                  dispatch({ type: UPDATE_PROFILE_RESET })
            }

      }, [dispatch, error, alert, isUpdated, user,navigate])

      return (
            <Fragment>
                  {
                        loading ? <Loader /> :
                              <Fragment>
                                    <div className="UpdateProfileContainer">
                                          <div className="UpdateProfileBox">
                                                <h2>Update Profile</h2>
                                                <form
                                                      className="UpdateProfileForm"
                                                      encType="multipart/form-data"
                                                      onSubmit={UpdateProfileSubmit}
                                                >
                                                      <div className="UpdateProfileName">
                                                            <Face />
                                                            <input
                                                                  type="text"
                                                                  placeholder="Name"
                                                                  name="name"
                                                                  value={name}
                                                                  onChange={(e) => setName(e.target.value)}
                                                            />
                                                      </div>
                                                      <div className="UpdateProfileEmail">
                                                            <MailOutline />
                                                            <input
                                                                  type="email"
                                                                  placeholder="Email"
                                                                  name="email"
                                                                  value={email}
                                                                  onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                      </div>

                                                      <div id="UpdateProfileImage">
                                                            <img src={avatarPreview} alt="Avatar Preview" />
                                                            <input
                                                                  type="file"
                                                                  name="avatar"
                                                                  onChange={(e) => setAvatar(e.target.files[0])}
                                                            />
                                                      </div>
                                                      <input type="submit" value="Update Profile" className="UpdateProfileBtn" />
                                                </form>
                                          </div>
                                    </div>
                              </Fragment>
                  }
           </Fragment>
      )
}

export default UpdateProfile
