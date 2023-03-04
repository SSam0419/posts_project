import React from "react";
import { useSelector } from "react-redux";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { selectUser } from "../slice/userSlice";
import logo from "../Asset/logo-black.png";
import "./Nav.css";

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

const Nav = () => {
  const user = useSelector(selectUser);
  return (
    <nav className="Nav">
      <Link to="/" className="site-title">
        <div className="logo">Tech Chat Daily</div>
      </Link>
      <ul className="main_nav">
        <CustomLink to="/post">Forum</CustomLink>
        <CustomLink to="/post">About</CustomLink>
      </ul>
      <div className="user_account_avator">
        {user.userProfile?.isLoggedIn && user.userProfile?.username}
        {!user.userProfile.isLoggedIn && <Link to="/sign_in">Sign in</Link>}
      </div>
    </nav>
  );
};

export default Nav;
