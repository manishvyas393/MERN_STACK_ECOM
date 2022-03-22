import React, { Fragment, useEffect, useState } from 'react'
import Loader from "../../layout/loader/Loader"
import { clearErrors } from '../../../actions/userProfileAction'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { Lock, LockOpen } from '@material-ui/icons'
import { useNavigate, useParams } from 'react-router-dom'
import "./resetpassword.css"
import { ResetForgotPassword } from '../../../actions/forgotPasswordAction'
const ResetPassword = () => {
      const dispatch = useDispatch();
      const alert = useAlert();
      const navigate = useNavigate();
      const { token } = useParams()
      const { error, success, loading } = useSelector(state => state.resetForgotPassword)

      const [newPassword, setNewPassword] = useState("")
      const [confirmPassword, setConfirmPassword] = useState("")


      const ResetPasswordSubmit = (e) => {
            e.preventDefault();
            const updateForm = new FormData();
            updateForm.set("password", newPassword);
            updateForm.set("confirmPassword", confirmPassword)
            dispatch(ResetForgotPassword(token, updateForm))
      }
      useEffect(() => {
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors())
            }
            if (success) {
                  alert.success("Password Reset Done")
                  navigate("/login")
            }
      }, [dispatch, success, error, token, alert, navigate])

      return (
            <Fragment>
                  {
                        loading ? <Loader /> :
                              <Fragment>
                                    <div className="ResetPasswordContainer">
                                          <div className="ResetPasswordBox">
                                                <h2>Reset Password</h2>
                                                <form className="ResetPasswordForm" onSubmit={ResetPasswordSubmit}>
                                                      <div className="ResetPassword">
                                                            <LockOpen />
                                                            <input
                                                                  type="password"
                                                                  placeholder="New Password"
                                                                  required
                                                                  name="password"
                                                                  value={newPassword}
                                                                  onChange={(e) => setNewPassword(e.target.value)}
                                                            />
                                                      </div>

                                                      <div className="ResetPassword">
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
                                                      <input type="submit" value="Reset Password" className="ResetPasswordBtn" />
                                                </form>
                                          </div>
                                    </div>
                              </Fragment>
                  }
            </Fragment>
      )
}

export default ResetPassword
