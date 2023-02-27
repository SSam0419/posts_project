import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SignIn.css";
import { signIn, userApi } from "../api/signUser";
import axios from "axios";
import { username, access_token } from "../slice/userSlice";

const SignIn = ({ setSignIn }) => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(username(userData.username));
      const token = await signIn(userData);
      dispatch(access_token(token));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="SignIn">
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="txt_field">
          <input
            type={"text"}
            required
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, username: e.target.value }));
            }}
          ></input>
          <span></span>
          <label>Username</label>
        </div>
        <div className="txt_field">
          <input
            type={"password"}
            required
            onChange={(e) => {
              setUserData((prev) => ({ ...prev, password: e.target.value }));
            }}
          ></input>
          <span></span>
          <label>Password</label>
        </div>
        <div className="forget_password">Forget Password?</div>
        <input type={"submit"} value={"Login"} />
        <div>
          Not a member?
          <span
            className="direct_to_sign_up"
            onClick={() => {
              setSignIn(false);
            }}
          >
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
