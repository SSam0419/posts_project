import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  selectAllPosts,
  fetchAllPosts,
  getPostsStatus,
  getPostsError,
} from "../slice/postSlice";

import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

import "./DiscussionPostPage.css";

const DiscussionPostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let { post_id } = useParams();

  const initialState = {
    _id: "",
    title: "",
    author: "",
    content: "",
    likes: 0,
    views: 0,
    createdAt: Date(),
    comments: [],
  };

  const [post, setPost] = useState(initialState);
  const [date, setDate] = useState("");

  const allPosts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchAllPosts());
    }
    if (postStatus === "succeeded") {
      const selectedPost = allPosts?.filter((post) => {
        return post._id == post_id;
      });
      setPost(selectedPost[0]);
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

  return (
    <div
      className="overlay"
      onClick={() => {
        navigate(-1);
      }}
    >
      <div
        className="DiscussionPostPage"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="header">
          <span className="author">{post.author}</span>
          <span className="title">{post.title}</span>

          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <RxCross1 />
          </button>
        </div>
        <div className="line"></div>
        <div className="content">{post.content}</div>
        <div className="line"></div>
        <div className="footer">
          <div>
            <span className="likes">
              <span className="icon like_btn">
                <AiOutlineHeart />
              </span>
              {post.likes.length}
            </span>
            <span className="views">
              <span className="icon">
                <AiOutlineEye />
              </span>
              {post.views.length}
            </span>
          </div>
          <div className="date">
            {_date.toLocaleDateString("en-US", options)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPostPage;
