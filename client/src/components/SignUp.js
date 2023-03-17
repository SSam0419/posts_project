import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./SignUp.css";
import { signUp } from "../api/signUser";

const SignUp = ({ setSignIn }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPw, setConfirmPw] = useState("");
  const [warning, setWarning] = useState(false);
  const [duplicateUser, setDuplicateUser] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!(confirmPw === password)) return setWarning(true);
    try {
      signUp(
        { username: username, password: password },
        setDuplicateUser,
        setSignIn
      );
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
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <span></span>
          <label>Username</label>
        </div>
        <div className="txt_field">
          <input
            type={"password"}
            required
            onChange={(e) => setPassword(e.target.value)}
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
