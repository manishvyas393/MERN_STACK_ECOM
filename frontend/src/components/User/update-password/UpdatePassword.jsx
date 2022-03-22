import React, { Fragment, useEffect,useState } from 'react'
import { clearErrors, passwordUpdate } from '../../../actions/userProfileAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import "./updatepassword.css"
import { Lock, VpnKey, LockOpen } from '@material-ui/icons'
import { UPDATE_PROFILE_RESET } from '../../../constants/userProfileConstants'
import { useNavigate } from 'react-router-dom'
const UpdatePassword = () => {
      const dispatch = useDispatch();
      const alert = useAlert();
      const navigate = useNavigate();
      const { error, isUpdated} = useSelector(state => state.ProfileUpdate)

      const [oldPassword, setOldPassword] = useState()
      const [newPassword, setNewPassword] = useState()
      const [confirmPassword, setConfirmPassword] = useState()

      const UpdatePasswordSubmit = (e) => {
            e.preventDefault();
            const updateForm = new FormData();
            updateForm.set("oldPassword", oldPassword);
            updateForm.set("newPassword", newPassword);
            updateForm.set("confirmPassword", confirmPassword)
            dispatch(passwordUpdate(updateForm))
      }

      useEffect(() => {
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors())
            }
            if (isUpdated) {
                  alert.success("Password Updated")
                  navigate("/account")
                  dispatch({ type: UPDATE_PROFILE_RESET })
            }

      }, [dispatch, error, alert, isUpdated,navigate])
      return (
            <Fragment>
                  <div className="UpdatePasswordContainer">
                        <div className="UpdatePasswordBox">
                              <h2>Update Password</h2>
                              <form className="UpdatePasswordForm" onSubmit={UpdatePasswordSubmit}>
                                    <div className="UpdatePassword">
                                          <VpnKey />
                                          <input
                                                type="password"
                                                placeholder="Current Password"
                                                required
                                                name="oldPassword"
                                                value={oldPassword}
                                                onChange={(e) => setOldPassword(e.target.value)}
                                          />
                                    </div>

                                    <div className="UpdatePassword">
                                          <LockOpen />
                                          <input
                                                type="password"
                                                placeholder="New Password"
                                                required
                                                name="newPassword"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                          />
                                    </div>

                                    <div className="UpdatePassword">
                                          <Lock />
                                          <input
                                                type="password"
                                                placeholder="Re-type New Password"
                                                required
                                                name="confirmPassword"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                          />
                                    </div>
                                    <input type="submit" value="Change" className="UpdatePasswordBtn" />
                              </form>
                        </div>
                  </div>
            </Fragment>
      )
}

export default UpdatePassword
