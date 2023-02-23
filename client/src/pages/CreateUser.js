import React, { useState } from "react";
import "./CreateUser.css";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const CreateUser = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <div className="CreateUser">
      {signIn && <SignIn setSignIn={setSignIn} />}
      {!signIn && <SignUp setSignIn={setSignIn} />}
    </div>
  );
};

export default CreateUser;
