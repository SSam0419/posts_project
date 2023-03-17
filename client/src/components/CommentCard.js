import React from "react";
import "./CommentCard.scss";
import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const CommentCard = ({ length, idx, comment, _date }) => {
  return (
    <div
      className={`CommentCard ${idx + 1 !== length ? "line_break" : ""}`}
      key={idx}
    >
      <div className="header">
        <div className="comment_author">{comment.author}</div>
        <div className="comment_date">{_date}</div>
      </div>
      <div className="comment_content">{comment.content}</div>
      {/* <div className="footer">
        <div className="comment_likes">
          <span className="icon like_btn">
            <AiOutlineHeart />
          </span>
          {comment.likes.length}
        </div>
      </div> */}
    </div>
  );
};

export default CommentCard;
