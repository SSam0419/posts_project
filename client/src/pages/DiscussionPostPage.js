import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../api/postApi.js";
import {
  selectAllPosts,
  fetchPostsWithLimit,
  getPostsStatus,
  getPostsError,
} from "../slice/postSlice";

import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";

import "./DiscussionPostPage.css";
import Overlay from "../components/Overlay";

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

  const allPosts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    async function fetchPost(post_id) {
      const data = await getPostById(post_id);
      setPost(data);
    }

    if (postStatus === "idle") {
      dispatch(fetchPostsWithLimit());
    }
    if (postStatus === "succeeded") {
      const selectedPost = allPosts?.filter((post) => {
        return post._id == post_id;
      });

      if (selectedPost[0] === undefined) {
        fetchPost(post_id).catch((err) => console.log(err));
      } else {
        setPost(selectedPost[0]);
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

  return (
    <Overlay
      onClose={() => {
        navigate(-1);
        navigate("http://localhost:3000/post");
      }}
    >
      <div
        className="DiscussionPostPage"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="container">
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
        <form>
          <input placeholder="comment ..."></input>
          <input
            type={"submit"}
            onClick={(e) => {
              e.preventDefault();
            }}
          />
        </form>
        <div className="comment">
          {post.comments.map((comment) => {
            return <div>{comment.content}</div>;
          })}
        </div>
      </div>
    </Overlay>
  );
};

export default DiscussionPostPage;
