import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { selectUser } from "../slice/userSlice";
import { RxAvatar } from "react-icons/rx";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { CgEreader } from "react-icons/cg";
import { MdTravelExplore } from "react-icons/md";
import "./Nav.scss";

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
  const [showUserProfile, setShowUserProfile] = useState(false);

  return (
    <nav className="Nav">
      <Link to="/" className="site-title">
        <div className="logo">Tech Chat Daily</div>
      </Link>
      <div className="container_links_user">
        <ul className="main_nav">
          <CustomLink to="/write_post" className="write_post_link">
            <HiOutlinePencilSquare size={20} />
            Write
          </CustomLink>
          |
          <CustomLink to="/post" className="write_post_link">
            <MdTravelExplore size={20} />
            Feeds
          </CustomLink>
          |
          <CustomLink to="/123" className="write_post_link">
            <CgEreader size={20} />
            Followed Writers
          </CustomLink>
          |
          {/* <CustomLink to="/321" className="write_post_link">
            My Posts
          </CustomLink>
          | */}
        </ul>
        <Link to="/my_user_profile" className="user_account_avator">
          {user.userProfile?.isLoggedIn && (
            <RxAvatar
              size={30}
              // onClick={() => setShowUserProfile((prev) => !prev)}
            />
          )}
          <div>
            {user.userProfile?.isLoggedIn && user.userProfile?.username}
          </div>
          {showUserProfile && (
            <div className="userProfileSetting">
              <div></div>
              <div></div>
              <div>Logout</div>
            </div>
          )}
          {!user.userProfile.isLoggedIn && <Link to="/sign_in">Sign in</Link>}
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
