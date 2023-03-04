import "./DiscussionPostCard.css";
import React from "react";
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import DiscussionPostPage from "../pages/DiscussionPostPage";
import { useNavigate, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../slice/userSlice";
import { pushViewsIntoState } from "../slice/postSlice";

const DiscussionPostCard = (post) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = user.userProfile.isLoggedIn;
  const username = user.userProfile.username;

  let content = post.post.content;
  if (post.post.content.length > 45 * 3) {
    content = content.slice(0, 45 * 3) + " ...";
  }
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(post.post.createdAt);
  return (
    <div
      className="DiscussionPostCard"
      onClick={() => {
        if (isLoggedIn) {
          dispatch(pushViewsIntoState({ username: username }));
        } else {
          dispatch(pushViewsIntoState({ username: "guest" }));
        }
        navigate(`${post.post._id}`, { state: post });
      }}
    >
      <div className="header">
        <span className="title">{post.post.title}</span>
        <span className="author">{post.post.author}</span>
      </div>
      <div className="line"></div>
      <div className="content" dangerouslySetInnerHTML={{ __html: content }} />
      <div className="line"></div>
      <div className="footer">
        <div>
          <span className="likes">
            <span className="icon  ">
              {isLoggedIn && post.post.likes.includes(username) && (
                <AiFillHeart />
              )}
              {(!isLoggedIn || !post.post.likes.includes(username)) && (
                <AiOutlineHeart />
              )}
            </span>
            {post.post.likes.length}
          </span>
          <span className="views">
            <span className="icon">
              <AiOutlineEye />
            </span>
            {post.post.views.length}
          </span>
        </div>

        <div className="date">{date.toLocaleDateString("en-US", options)}</div>
      </div>
    </div>
  );
};

export default DiscussionPostCard;
