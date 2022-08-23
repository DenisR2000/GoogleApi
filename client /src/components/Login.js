import React from "react";
import Google from "../imgs/google.png";
import Facebook from "../imgs/facebook.png";
import Github from "../imgs/github.png";
import '../styles/Login.css'

const Login = () => {
  const loginWithGoogle = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const loginWithGithub = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const loginWithFacebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  return (
    <div className="component__container">
      <h1 className="login__title">Choose a Login Method</h1>
      <div className="login__wraper">
        <div className="left__container">
          <div className="login__button google" onClick={loginWithGoogle}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="login__button facebook" onClick={loginWithFacebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="login__button github" onClick={loginWithGithub}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center__line">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right__container">
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <button className="submit">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;