import React from "react";
import "./PostCommentForm.scss";
import { useSelector } from "react-redux";

import { AiOutlineCheck } from "react-icons/ai";

import { selectUser } from "../slice/userSlice.js";

const CommentForm = ({ handleCommentSubmit, comment, setComment, notify }) => {
  const user = useSelector(selectUser);

  return (
    <div className="PostCreatePostForm">
      <form
        className="comment_form"
        onClick={(e) => {
          e.stopPropagation();
          if (!user.userProfile.isLoggedIn) {
            notify("comment!");
          }
        }}
        onSubmit={(e) => handleCommentSubmit(e)}
      >
        <input
          placeholder="type your comment ..."
          type={"text"}
          required
          value={comment}
          maxLength="100"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          disabled={!user.userProfile.isLoggedIn}
        ></input>
        <button
          type="submit"
          className="comment_btn"
          disabled={!user.userProfile.isLoggedIn}
          onClick={(e) => {
            if (comment.trim() == "") {
              setComment("");
              return;
            }
          }}
        >
          <AiOutlineCheck />
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
