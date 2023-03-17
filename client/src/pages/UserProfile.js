import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPostsWithIds } from "../slice/postSlice";
import {
  addProfileComment,
  pushProfileComment,
  selectUser,
} from "../slice/userSlice";
import { logout } from "../slice/userSlice";
import "./UserProfile.scss";

import DiscussionPostCard from "../components/DiscussionPostCard";
import CommentCard from "../components/CommentCard";
import PostCommentForm from "../components/PostCommentForm";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastTime } from "../constant/ToastTime.js";

const UserProfile = () => {
  const toastTime = ToastTime();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [showPost, setShowPost] = useState(true);
  const [loading, setLoading] = useState(false);
  const [wrotePosts, setWrotePosts] = useState([]);
  const [comment, setComment] = useState("");
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  useEffect(() => {
    setLoading(true);
    async function fetchData(ids) {
      const records = await dispatch(fetchPostsWithIds(ids));

      if (records.payload.status === 200) {
        setWrotePosts(records.payload.data);
      } else {
        console.log(records);
      }

      setLoading(false);
    }

    fetchData(user.userProfile.wrotePost);
  }, [user.userProfile.wrotePost, dispatch]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === "") {
      setComment("");
      return;
    }
    const commentDetail = {
      author: user.userProfile.username,
      content: comment,
      date: new Date().toDateString(),
    };
    dispatch(pushProfileComment(commentDetail));
    dispatch(
      addProfileComment({
        username: user.userProfile.username,
        comment: commentDetail,
      })
    );
    setComment("");
  };

  const notify = (str) =>
    toast.error(`Log In to ${str}`, {
      position: "top-right",
      autoClose: toastTime,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <div className="UserProfile">
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={toastTime}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="header">
        <div className="row_1">
          <div className="username">
            <div className="avator">O</div>
            <div>{user.userProfile.username}</div>
          </div>
          <div className="brief">a boy who love basketball</div>
        </div>
        <div className="row_2">
          <div className="followers">
            <span className="number">{user.userProfile.followers?.length}</span>
            Followers
          </div>
          <div>|</div>
          <div className="post_count">
            <span className="number">{user.userProfile.wrotePost?.length}</span>
            Post
          </div>
          <div>|</div>
          <div className="following">
            <span className="number">{user.userProfile.following?.length}</span>
            Following
          </div>
        </div>
      </div>
      <div className="button_row">
        <button
          className="logout_btn"
          onClick={() => {
            dispatch(logout(user.userProfile.username));
            navigate("/");
          }}
        >
          LOG OUT
        </button>
      </div>
      <div className="post_container_nav">
        <div
          className={`profile_nav ${showPost ? "active" : ""}`}
          onClick={() => {
            setShowPost(true);
          }}
        >
          Posts
        </div>
        <div
          className={`profile_nav ${!showPost ? "active" : ""}`}
          onClick={() => {
            setShowPost(false);
          }}
        >
          Comments
        </div>
      </div>
      <div className="post_container">
        {loading && <h1>loadding</h1>}
        {showPost &&
          wrotePosts?.map((post) => {
            return <DiscussionPostCard post={post} />;
          })}
        {!showPost && (
          <PostCommentForm
            handleCommentSubmit={handleCommentSubmit}
            comment={comment}
            setComment={setComment}
            notify={notify}
          />
        )}
        {!showPost &&
          user.userProfile.comments?.map((comment, idx) => {
            let _date = new Date(comment.date);
            _date = _date.toLocaleDateString("en-US", options);
            return (
              <CommentCard
                length={user.userProfile?.comments?.length}
                idx={idx}
                comment={comment}
                _date={_date}
              />
            );
          })}
      </div>
    </div>
  );
};

export default UserProfile;
