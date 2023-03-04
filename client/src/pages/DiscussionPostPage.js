import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { getPostById } from "../api/postApi.js";
import {
  selectAllPosts,
  fetchPostsWithLimit,
  getPostsStatus,
  getPostsError,
  addComment,
  pushCommentIntoState,
  likePost,
  pushLikesIntoState,
} from "../slice/postSlice";

import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";

import "./DiscussionPostPage.css";
import Overlay from "../components/Overlay";
import { selectUser } from "../slice/userSlice.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DiscussionPostPage = () => {
  let { post_id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");

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

  const allPosts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);
  const user = useSelector(selectUser);
  const toastTime = 1000;

  useEffect(() => {
    async function fetchPost(post_id) {
      const data = await getPostById(post_id);
      setPost(data);
    }

    if (postStatus === "idle") {
      dispatch(
        fetchPostsWithLimit({ from: 0, to: 15, sort: { createdAt: -1 } })
      );
    }

    if (postStatus === "succeeded") {
      if (location?.state?.post) {
        setPost(location?.state?.post);
      } else {
        fetchPost(post_id).catch((err) => console.log(err));
      }
    }
  }, [postStatus, dispatch, post_id]);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const _date = new Date(post?.createdAt);

  if (allPosts.length == 0) {
    return;
  }

  //this function will update the comment state and also database
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() == "") {
      setComment("");
      return;
    }
    const commentDetail = {
      author: user.userProfile.username,
      content: comment,
      date: new Date().toDateString(),
      likes: [],
    };
    dispatch(addComment({ post_id: post_id, comment: commentDetail }));
    dispatch(
      pushCommentIntoState({ post_id: post_id, comment: commentDetail })
    );
    setComment("");
    setPost({ ...post, comments: [commentDetail, ...post.comments] });
  };

  return (
    <Overlay
      onClose={() => {
        navigate("/post");
      }}
    >
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
      <div
        className="DiscussionPostPage"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="container">
          <div className="header">
            <div className="title_author">
              <span className="title">{post.title}</span>
              <span className="author">{post.author}</span>
            </div>
            <button
              onClick={() => {
                navigate(-1);
              }}
            >
              <RxCross1 />
            </button>
          </div>
          <div className="line"></div>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="footer">
            <div>
              <span className="likes">
                {post?.likes?.includes(user?.userProfile?.username) && (
                  <AiFillHeart color="red" />
                )}

                <span className="icon like_btn">
                  {!post?.likes?.includes(user?.userProfile?.username) && (
                    <AiOutlineHeart
                      onClick={() => {
                        if (!user?.userProfile?.isLoggedIn) {
                          notify("like the post!");
                          return;
                        } else {
                          console.log({
                            username: user?.userProfile?.username,
                            post_id: post_id,
                          });
                          dispatch(
                            likePost({
                              username: user?.userProfile?.username,
                              post_id: post_id,
                            })
                          );
                          dispatch(
                            pushLikesIntoState({
                              username: user?.userProfile?.username,
                              post_id: post_id,
                            })
                          );
                        }
                      }}
                    />
                  )}
                </span>
                {post?.likes?.length}
              </span>
              <span className="views">
                <span className="icon">
                  <AiOutlineEye />
                </span>
                {post?.views?.length}
              </span>
            </div>
            <div className="date">
              {_date.toLocaleDateString("en-US", options)}
            </div>
          </div>
          <div className="line"></div>

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

          <div className="comments_container">
            {post?.comments?.length == 0 && "no comment yet"}
            {post?.comments?.map((comment, idx) => {
              const _date = new Date(comment.date);
              return (
                <div className="comment_card" key={idx}>
                  <div className="header">
                    <div className="comment_author">{comment.author}</div>
                    <div className="comment_date">
                      {_date.toLocaleDateString("en-US", options)}
                    </div>
                  </div>
                  <div className="comment_content">{comment.content}</div>
                  <div className="footer">
                    <div className="comment_likes">
                      <span className="icon like_btn">
                        <AiOutlineHeart />
                      </span>
                      {comment.likes.length}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default DiscussionPostPage;
