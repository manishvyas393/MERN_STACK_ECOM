import { MailOutline } from '@material-ui/icons'
import React, { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useAlert } from 'react-alert'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import Loader from "../../layout/loader/Loader"
import MetaData from "../../layout/MetaData"
import { clearErrors, forgotPassword } from '../../../actions/forgotPasswordAction'
import "./forgotpassword.css"
const ForgotPassword = () => {
      const dispatch = useDispatch()
      const alert = useAlert()
      const { error, loading, message } = useSelector(state => state.forgotPassword)
      const [resetEmail, setResetEmail] = useState("")
      const ForgotPasswordSubmit = (e) => {
            e.preventDefault();
            const forgotPasswordForm = new FormData()
            forgotPasswordForm.set("email", resetEmail);
            dispatch(forgotPassword(forgotPasswordForm))
      }
      useEffect(() => {
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors());
            }
            if (message) {
                  alert.success(message)
            }
      }, [dispatch, error, alert, message])
      return (
            <Fragment>
                  {
                        loading ? <Loader /> :
                              <Fragment>
                                    <MetaData title="Reset Password" />
                                    <div className="ForgotPasswordContainer">
                                          <div className="ForgotPasswordBox">
                                                <h2>Forgot Password</h2>
                                                <form className="ForgotPasswordForm" onSubmit={ForgotPasswordSubmit}>
                                                      <div className="ForgotPasswordEmail">
                                                            <MailOutline />
                                                            <input type="email"
                                                                  name=""
                                                                  id=""
                                                                  value={resetEmail}
                                                                  placeholder='email'
                                                                  required
                                                                  onChange={(e) => setResetEmail(e.target.value)}
                                                            />
                                                      </div>
                                                      <input type="submit" value="Send Reset Link" className='ForgotPasswordBtn' />

                                                </form>
                                          </div>
                                    </div>
                              </Fragment>
                  }
            </Fragment>

      )
}

export default ForgotPassword
