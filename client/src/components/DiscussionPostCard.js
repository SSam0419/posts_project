import "./DiscussionPostCard.css";
import React from "react";
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import DiscussionPostPage from "../pages/DiscussionPostPage";
import { useNavigate } from "react-router-dom";

const DiscussionPostCard = (post) => {
  const navigate = useNavigate();
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
        navigate(`${post.post._id}`);
      }}
    >
      <div className="header">
        <span className="title">{post.post.title}</span>
        <span className="author">{post.post.author}</span>
      </div>
      <div className="line"></div>
      <div className="content">{content}</div>
      <div className="line"></div>
      <div className="footer">
        <div>
          <span className="likes">
            <span
              className="icon like_btn"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <AiOutlineHeart />
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
