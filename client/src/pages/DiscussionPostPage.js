import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../api/postApi.js";
import {
  selectAllPosts,
  fetchPostsWithLimit,
  getPostsStatus,
  getPostsError,
  addComment,
} from "../slice/postSlice";

import { AiOutlineEye, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { AiOutlineCheck } from "react-icons/ai";

import "./DiscussionPostPage.css";
import Overlay from "../components/Overlay";

const DiscussionPostPage = () => {
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

  let { post_id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [post, setPost] = useState(initialState);
  const [postComments, setPostComments] = useState([]);
  const [comment, setComment] = useState("");

  const allPosts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    async function fetchPost(post_id) {
      const data = await getPostById(post_id);
      setPost(data);
      setPostComments(data.comments);
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
        setPostComments(selectedPost[0].comments);
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
    if (comment.trim() === "") {
      setComment("");
      return;
    }
    const commentDetail = {
      author: "test",
      content: comment,
      date: new Date(),
      likes: [],
    };
    dispatch(addComment({ post_id: post_id, comment: commentDetail }));
    setComment("");
    setPostComments((prev) => [commentDetail, ...prev]);
  };

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
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {/* <div className="content">{post.content}</div> */}
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
          <div className="line"></div>
          <form
            className="comment_form"
            onClick={(e) => {
              e.stopPropagation();
            }}
            onSubmit={(e) => handleCommentSubmit(e)}
          >
            <input
              placeholder="comment ..."
              type={"text"}
              required
              value={comment}
              maxlength="100"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            ></input>
            <button type="submit" className="comment_btn">
              <AiOutlineCheck />
            </button>
          </form>
          <div className="comments_container">
            {postComments.length == 0 && "no comment yet"}
            {postComments.map((comment) => {
              const _date = new Date(comment.date);
              return (
                <div className="comment_card">
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
