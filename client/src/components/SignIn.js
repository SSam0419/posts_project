import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FORM_DATA } from "../actions/constant";
import "./SignIn.css";
import { signIn, userApi } from "../api/signUser";
import axios from "axios";

const SignIn = ({ setSignIn }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.createUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      signIn(userData);
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
            onChange={(e) => dispatch(FORM_DATA({ username: e.target.value }))}
          ></input>
          <span></span>
          <label>Username</label>
        </div>
        <div className="txt_field">
          <input
            type={"password"}
            required
            onChange={(e) => dispatch(FORM_DATA({ password: e.target.value }))}
          ></input>
          <span></span>
          <label>Password</label>
        </div>
        <div className="forget_password">Forget Password?</div>
        <input type={"submit"} value={"Login"} />
        <div>
          Not a member?{" "}
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
