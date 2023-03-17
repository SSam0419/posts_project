import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PropagateSpinner from "../components/PropagateSpinner";
import { fetchPostsWithIds } from "../slice/postSlice";
import {
  getVisitingStatus,
  selectUser,
  visitUser,
  addProfileComment,
} from "../slice/userSlice";
import "./VisitUserProfile.scss";

import DiscussionPostCard from "../components/DiscussionPostCard";
import CommentCard from "../components/CommentCard";
import PostCommentForm from "../components/PostCommentForm";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastTime } from "../constant/ToastTime.js";

const VisitUserProfile = () => {
  const toastTime = ToastTime();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const visitingStatus = useSelector(getVisitingStatus);

  const [wrotePosts, setWrotePosts] = useState([]);
  const [comment, setComment] = useState("");
  const [visitedUser, setVisitedUser] = useState(null);
  const [showPost, setShowPost] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (user.userProfile.username === userId) {
      navigate("/my_user_profile");
      return;
    }
    async function fetchUser() {
      const visitedUser = await dispatch(visitUser(userId));
      fetchData(visitedUser.payload.wrotePost);
      setVisitedUser(visitedUser.payload);
    }

    fetchUser();

    async function fetchData(ids) {
      const records = await dispatch(fetchPostsWithIds(ids));
      if (records.payload.status === 200) {
        setWrotePosts(records.payload.data);
      } else {
        console.log(records);
      }

      setLoading(false);
    }
  }, [userId, dispatch]);

  const followUser = async () => {
    let fromThisUser = user.userProfile.username;
    let toThatUser = userId;
    await dispatch(followUser({ fromThisUser, toThatUser }));
  };

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
    dispatch(
      addProfileComment({
        username: visitedUser.username,
        comment: commentDetail,
      })
    );

    setVisitedUser({
      ...visitedUser,
      comments: [commentDetail, ...visitedUser.comments],
    });
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
    <div className="VisitUserProfile">
      {visitingStatus === "loading" && <PropagateSpinner />}

      {visitingStatus === "succeeded" && (
        <>
          <div className="header">
            <div className="row_1">
              <div className="username">
                <div className="avator">O</div>
                <div>{visitedUser?.username}</div>
              </div>
              <div className="brief">a boy who love basketball</div>
            </div>
            <div className="row_2">
              <div className="followers">
                <span className="number">91</span> Followers
              </div>
              <div>|</div>
              <div className="post_count">
                <span className="number">91</span> Post
              </div>
              <div>|</div>
              <div className="following">
                <span className="number">91</span> Following
              </div>
            </div>
          </div>
          <div className="button_row">
            <button
              className="follow_btn"
              onClick={() => {
                followUser();
              }}
            >
              FOLLOW
            </button>
            <button className="message_btn">MESSAGE</button>
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
              visitedUser.comments?.map((comment, idx) => {
                let _date = new Date(comment.date);
                _date = _date.toLocaleDateString("en-US", options);
                return (
                  <CommentCard
                    length={visitedUser?.comments?.length}
                    idx={idx}
                    comment={comment}
                    _date={_date}
                  />
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default VisitUserProfile;
