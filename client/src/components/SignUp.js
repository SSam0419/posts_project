import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FORM_DATA } from "../actions/constant";
import "./SignUp.css";
import { signUp } from "../api/signUser";

const SignUp = ({ setSignIn }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.createUser);
  const [confirmPw, setConfirmPw] = useState("");
  const [warning, setWarning] = useState(false);
  const [duplicateUser, setDuplicateUser] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(confirmPw === userData.password)) return setWarning(true);
    try {
      signUp(userData, setDuplicateUser, setSignIn);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="SignUp">
      <h1>Sign Up</h1>
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
        <div className="txt_field">
          <input
            type={"password"}
            required
            onChange={(e) => setConfirmPw(e.target.value)}
          ></input>
          <span></span>
          <label>Confirm Password</label>
        </div>
        {warning && <p className="warning">password not matched</p>}
        {duplicateUser && <p className="warning">username registered</p>}
        <input type={"submit"} value={"Sign Up"} />
      </form>
    </div>
  );
};

export default SignUp;
