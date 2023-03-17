import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./SignIn.css";
import { signIn, selectUser } from "../slice/userSlice";

const SignIn = ({ setSignIn }) => {
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUser);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signIn(userData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") navigate("/");
      });
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
        <div className="warning">
          {userProfile.error === "wrong username" && "wrong username"}
        </div>
        <div className="warning">
          {userProfile.error === "wrong password" && "wrong password"}
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
