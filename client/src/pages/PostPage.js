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
  setFullscreenState,
  dislikePost,
  pullLikesFromState,
} from "../slice/postSlice";

import {
  AiOutlineEye,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

import Overlay from "../components/Overlay";
import { selectUser } from "../slice/userSlice.js";
import { ToastContainer, toast } from "react-toastify";

import "./PostPage.scss";
import "react-toastify/dist/ReactToastify.css";

import PostCommentForm from "../components/PostCommentForm.js";
import CommentCard from "../components/CommentCard.js";

const PostPage = () => {
  let { post_id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState({});
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

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

  useEffect(() => {
    dispatch(setFullscreenState(true));
    setLike(post?.likes?.includes(user?.userProfile?.username));
    setLikeCount(post?.likes?.length);
  }, [post]);

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
        dispatch(setFullscreenState(false));
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
        className="PostPage"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="container">
          <div className="header">
            <div>
              <button
                onClick={() => {
                  dispatch(setFullscreenState(false));
                  navigate(-1);
                }}
              >
                <AiOutlineArrowLeft size={25} />
              </button>
            </div>

            <div
              className="author"
              onClick={() => {
                dispatch(setFullscreenState(false));
                navigate("/visit_user_profile/" + post.author);
              }}
            >
              <span className="icon">
                <RxAvatar size={20} />
              </span>
              <span>{post.author}</span>
            </div>
          </div>
          <div className="content">
            <div className="title">{post.title}</div>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          <div className="footer">
            <div>
              <span className="likes">
                {like && (
                  <AiFillHeart
                    className="icon"
                    color="red"
                    onClick={() => {
                      setLike(false);
                      setLikeCount((prev) => prev - 1);
                      dispatch(
                        dislikePost({
                          username: user?.userProfile?.username,
                          post_id: post_id,
                        })
                      );
                      dispatch(
                        pullLikesFromState({
                          username: user?.userProfile?.username,
                          post_id: post_id,
                        })
                      );
                    }}
                  />
                )}
                <span className="icon like_btn">
                  {!like && (
                    <AiOutlineHeart
                      onClick={() => {
                        setLike(true);
                        setLikeCount((prev) => prev + 1);
                        if (!user?.userProfile?.isLoggedIn) {
                          notify("like the post!");
                          return;
                        } else {
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
                {likeCount}
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
          <PostCommentForm
            handleCommentSubmit={handleCommentSubmit}
            comment={comment}
            setComment={setComment}
            notify={notify}
          />

          <div className="comments_container">
            {post?.comments?.length == 0 && "no comment yet"}
            {post?.comments?.map((comment, idx) => {
              let _date = new Date(comment.date);
              _date = _date.toLocaleDateString("en-US", options);
              return (
                <CommentCard
                  length={post?.comments?.length}
                  idx={idx}
                  comment={comment}
                  _date={_date}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export default PostPage;
