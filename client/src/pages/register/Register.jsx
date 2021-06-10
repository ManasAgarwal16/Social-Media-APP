import "./register.css";
import { useContext, useRef } from "react";
import axios from "axios"
import {useHistory} from "react-router"
import { Link } from "@material-ui/core";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const handleClick = async(e) => {
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value)
    {
      password.current.setCustomValidity("Passwords don't match!")
    }
    else
    {
      const user = {
        username:username.current.value,
        email:email.current.value,
        password:password.current.value
      }
      try
      {
        await axios.post("/auth/register",user)
        history.push("/login")
        
      }
      catch(err)
      {
        console.log(err);
      }
      

    }
    
  };



  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick} >
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" required ref={email} type="email" className="loginInput" />
            <input placeholder="Password" required ref={password} type="password" minLength="6" className="loginInput" />
            <input placeholder="Confirm Password" required type="password" ref={passwordAgain} className="loginInput" />
            <button className="loginButton" type="submit" >Sign Up</button>
            <Link to="/login">
              <button className="loginRegisterButton">
                Log into Account
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
