import "./DiscussionBoardPage.css";
import React, { useEffect, useState } from "react";
import ToolBar from "../components/ToolBar";
import DiscussionPostCard from "../components/DiscussionPostCard";
import { useDispatch, useSelector } from "react-redux";
import {
  pushAllPosts,
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPostsWithLimit,
} from "../slice/postSlice";
import { Outlet } from "react-router-dom";
import PropagateSpinner from "../components/PropagateSpinner";
import CreatePostBtn from "../components/CreatePostBtn";

const DiscussionBoardPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPostsWithLimit());
    }
  }, [postStatus, dispatch]);

  return (
    <div className="DiscussionBoardPage">
      <ToolBar />
      {postStatus === "idle" && <PropagateSpinner />}
      <div className="card_container">
        {posts.length > 0 &&
          posts?.map((post, idx) => {
            return <DiscussionPostCard post={post} key={idx} />;
          })}
      </div>
      <CreatePostBtn />
      <Outlet />
    </div>
  );
};

export default DiscussionBoardPage;
