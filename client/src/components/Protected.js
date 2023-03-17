import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../slice/userSlice";

function Protected({ children }) {
  const user = useSelector(selectUser);

  if (!user.userProfile.isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default Protected;
