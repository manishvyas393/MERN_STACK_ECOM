import { Face, LockOpen, MailOutline } from '@material-ui/icons'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import Loader from "../../layout/loader/Loader"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login, clearErrors, register } from '../../../actions/userActions'
import { useSelector, useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import profile from "../../../images/Profile.png"
import "./loginsignup.css"
const LoginSignUp = () => {
      const alert = useAlert();
      const dispatch = useDispatch()
      const navigate = useNavigate()
      const location=useLocation()
      const {loading,error,isAuthenticated,}=useSelector(state=>state.user)
      const RegisterTab=useRef(null)
      const LoginTab = useRef(null)
      const switchTab = useRef(null)

      const [LoginEmail, setLoginEmail] = useState("");
      const [LoginPassword, setLoginPassword] = useState("")

      const [user, setUser] = useState({
            name: "",
            email: "",
            password: "",

      })
      const { name, email, password,} = user;
      const [avatar, setAvatar] = useState(profile)
      const [avatarPreview,setAvatarPreview]=useState(profile)
    
    
      const LoginSubmit = (e) => {
            e.preventDefault();
            dispatch(login(LoginEmail,LoginPassword))
      }
      const RegisterSubmit = (e) => {
            e.preventDefault();
            const myForm = new FormData();
            myForm.set("name", name);
            myForm.set("email", email);
            myForm.set("password", password);
            myForm.set("avatar", avatar)
            dispatch(register(myForm))
      }
      const RegisterDataChange = (e) => {
            console.log("avatar",avatar)
            if (e.target.name==="avatar") {
                  const reader = new FileReader()
                 
                  reader.onload = () => {
                        if (reader.readyState === 2) {
      
                              setAvatarPreview(reader.result)
                              setAvatar(reader.result);
                  

                        }
                  }
            }
            else {
                  setUser({
                        ...user,
                        [e.target.name]:e.target.value
                  })
                  console.log(setUser)
            }
      }  
      const redirect = location.search ? location.search.split("=")[1] : "/account"
      useEffect(() => {
            if (error) {
                  alert.error(error)
                  dispatch(clearErrors())
            }
            if (isAuthenticated) {
                  navigate(redirect)
            }
           
      },[dispatch,error,alert,isAuthenticated,navigate,redirect])
      
      const switchTabs = (e,tab) => {
            if (tab === "login") {
                  switchTab.current.classList.add("shiftToNeutral");
                  switchTab.current.classList.remove("shiftToRight");

                  RegisterTab.current.classList.remove("shiftToNeutralForm");
                  LoginTab.current.classList.remove("shiftToLeft");
            }
            if (tab === "register"){
                  switchTab.current.classList.add("shiftToRight");
                  switchTab.current.classList.remove("shiftToNeutral");

                  RegisterTab.current.classList.add("shiftToNeutralForm");
                  LoginTab.current.classList.add("shiftToLeft");
            }
      }
      return (
            <Fragment>
                  {
                        loading ? <Loader /> : <Fragment>
                              <div className="LoginSignUpContainer">
                                    <div className="LoginSignUpBox">
                                          <div>
                                                <div className="ToggleTab">
                                                      <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                                      <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                                </div>
                                                <button ref={switchTab}> </button>
                                          </div>
                                          <form className="LoginForm"
                                                ref={LoginTab} onSubmit={LoginSubmit}>
                                                <div className="LoginEmail">
                                                      <MailOutline />
                                                      <input type="email"
                                                            name=""
                                                            id=""
                                                            value={LoginEmail}
                                                            placeholder='email'
                                                            required
                                                            onChange={(e) => setLoginEmail(e.target.value)}
                                                      />
                                                </div>
                                                <div className="LoginPassword">
                                                      <LockOpen />
                                                      <input type="password"
                                                            name=""
                                                            id=""
                                                            value={LoginPassword}
                                                            placeholder='password'
                                                            required
                                                            onChange={(e) => setLoginPassword(e.target.value)}
                                                      />
                                                </div>
                                                <Link to="/password/forgot">Forgot Password?</Link>
                                                <input type="submit" value="Login" className='LoginBtn' />

                                          </form>
                                          <form
                                                className="SignUpForm"
                                                ref={RegisterTab}
                                                encType="multipart/form-data"
                                                onSubmit={RegisterSubmit}
                                          >
                                                <div className="signUpName">
                                                      <Face />
                                                      <input
                                                            type="text"
                                                            placeholder="Name"
                                                            required
                                                            name="name"
                                                            value={name}
                                                            onChange={RegisterDataChange}
                                                      />
                                                </div>
                                                <div className="signUpEmail">
                                                      <MailOutline />
                                                      <input
                                                            type="email"
                                                            placeholder="Email"
                                                            required
                                                            name="email"
                                                            value={email}
                                                            onChange={RegisterDataChange}
                                                      />
                                                </div>
                                                <div className="signUpPassword">
                                                      <LockOpen />
                                                      <input
                                                            type="password"
                                                            placeholder="Password"
                                                            required
                                                            name="password"
                                                            value={password}
                                                            onChange={RegisterDataChange}
                                                      />
                                                </div>

                                                <div id="registerImage">
                                                      <img src={avatarPreview} alt="Avatar Preview" />
                                                      <input
                                                            type="file"
                                                            name="avatar"
                                                            onChange={(e)=>setAvatar(e.target.files[0])}
                                                      />
                                                </div>
                                                <input type="submit" value="Register" className="SignUpBtn" />
                                          </form>
                                    </div>
                              </div>
                        </Fragment>
                  }
           </Fragment>
      )
}

export default LoginSignUp
