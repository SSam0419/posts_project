import "./DiscussionBoardPage.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import ToolBar from "../components/ToolBar";
import DiscussionPostCard from "../components/DiscussionPostCard";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  fetchPostsWithLimit,
  getPostsLoadCount,
  getPostsHasMore,
  cleanPosts,
  setFullscreenState,
} from "../slice/postSlice";
import { Outlet, useNavigate } from "react-router-dom";
import PropagateSpinner from "../components/PropagateSpinner";
import * as category from "../constant/PostCategory.js";

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

  const [displayGrid, setDisplayGrid] = useState(true);

  const shouldDispatch = useRef(true);

  const navigate = useNavigate();

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

  const [activeCate, setActiveCate] = useState(category.latestTechnology.var);

  return (
    <div className="DiscussionBoardPage">
      <ToolBar
        setFilter={setFilter}
        setSortOption={setSortOption}
        order={order}
        setOrder={setOrder}
        displayGrid={displayGrid}
        setDisplayGrid={setDisplayGrid}
        activeCate={activeCate}
        setActiveCate={setActiveCate}
      />
      <div className={`${displayGrid ? "grid" : "row"}`}>
        {posts.length > 0 &&
          posts
            ?.filter((post) => post.category == activeCate)
            .filter(
              (post) =>
                post.author.toLowerCase().includes(filter.toLowerCase()) ||
                post.title.toLowerCase().includes(filter.toLowerCase()) ||
                post.content.toLowerCase().includes(filter.toLowerCase())
            )
            .map((post, idx) => {
              return (
                <div className={`${displayGrid ? "grid_card" : "row_card"}`}>
                  <DiscussionPostCard post={post} key={idx} />
                </div>
              );
            })}
      </div>

      <div ref={loaderRef}></div>

      <Outlet />

      {(postStatus === "idle" || postStatus === "loading" || hasMore) && (
        <div>
          <PropagateSpinner />
        </div>
      )}
    </div>
  );
};

export default DiscussionBoardPage;
