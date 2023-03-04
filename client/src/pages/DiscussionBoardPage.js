import "./DiscussionBoardPage.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ToolBar from "../components/ToolBar";
import DiscussionPostCard from "../components/DiscussionPostCard";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPostsWithLimit,
  getPostsLoadCount,
  getPostsHasMore,
  cleanPosts,
} from "../slice/postSlice";
import { Outlet } from "react-router-dom";
import PropagateSpinner from "../components/PropagateSpinner";
import CreatePostBtn from "../components/CreatePostBtn";

const DiscussionBoardPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostsStatus);

  const loadCount = useSelector(getPostsLoadCount);
  const hasMore = useSelector(getPostsHasMore);

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");

  const [sortOption, setSortOption] = useState("createdAt");
  const [order, setOrder] = useState(-1);

  const shouldDispatch = useRef(true);

  useEffect(() => {
    if (postStatus === "idle" && shouldDispatch.current) {
      shouldDispatch.current = false;
      dispatch(
        fetchPostsWithLimit({
          from: 0,
          to: loadCount,
          sort: { createdAt: -1 },
        })
      );
    }
  }, []);

  useEffect(() => {
    if (postStatus === "succeeded" && !shouldDispatch.current) {
      dispatch(
        fetchPostsWithLimit({
          from: (page - 1) * loadCount + 1,
          to: page * loadCount,
          sort: { [sortOption]: order },
        })
      );
    }
  }, [page]);

  useEffect(() => {
    if (postStatus === "succeeded" && !shouldDispatch.current) {
      setPage(1);
      dispatch(cleanPosts());
      dispatch(
        fetchPostsWithLimit({
          from: 0,
          to: loadCount,
          sort: { [sortOption]: order },
        })
      );
    }
  }, [sortOption, order]);

  const observer = useRef();
  const loaderRef = useCallback(
    (node) => {
      if (postStatus === "loading") return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [postStatus, hasMore]
  );

  return (
    <div className="DiscussionBoardPage">
      <ToolBar
        setFilter={setFilter}
        setSortOption={setSortOption}
        order={order}
        setOrder={setOrder}
      />
      <div className="card_container">
        {posts.length > 0 &&
          posts
            ?.filter(
              (post) =>
                post.author.toLowerCase().includes(filter.toLowerCase()) ||
                post.title.toLowerCase().includes(filter.toLowerCase()) ||
                post.content.toLowerCase().includes(filter.toLowerCase())
            )
            .map((post, idx) => {
              return <DiscussionPostCard post={post} key={idx} />;
            })}
      </div>
      <div ref={loaderRef}></div>
      {(postStatus === "idle" || postStatus === "loading") && (
        <PropagateSpinner />
      )}
      <CreatePostBtn />
      <Outlet />
    </div>
  );
};

export default DiscussionBoardPage;
