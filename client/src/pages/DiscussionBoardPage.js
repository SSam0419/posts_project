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
  fetchAllPosts,
} from "../slice/postSlice";
import { Outlet } from "react-router-dom";

const DiscussionBoardPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchAllPosts());
    }
  }, [postStatus, dispatch]);

  return (
    <div className="DiscussionBoardPage">
      <ToolBar />
      <div className="card_container">
        {postStatus === "idle" && <p>loading...</p>}
        {posts.length > 0 &&
          posts?.map((post, idx) => {
            return <DiscussionPostCard post={post} key={idx} />;
          })}
      </div>
      <Outlet />
    </div>
  );
};

export default DiscussionBoardPage;
