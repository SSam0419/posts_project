import "./ToolBar.css";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSortAlt2 } from "react-icons/bi";

const SearchBar = () => {
  return (
    <div className="SearchBar">
      <div className="search_icon">
        <AiOutlineSearch />
      </div>
      <input placeholder="enter post's title to search"></input>
    </div>
  );
};

const Sort = () => {
  return (
    <div className="Sort">
      <div>Date</div>
      <BiSortAlt2 />
    </div>
  );
};

const TogglePosts = () => {
  const [seenPostMode, setSeenPostMode] = useState(false);
  return (
    <div className="TogglePosts">
      {seenPostMode && "Seen Posts"}
      {!seenPostMode && "New Posts"}
      <label className="switch">
        <input
          type="checkbox"
          onChange={(e) => {
            setSeenPostMode(e.target.checked);
          }}
        />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

const ToolBar = () => {
  return (
    <div className="ToolBar">
      {SearchBar()}
      {Sort()}
      {TogglePosts()}
    </div>
  );
};

export default ToolBar;
