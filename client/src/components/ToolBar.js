import "./ToolBar.css";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSortAlt2 } from "react-icons/bi";

const SearchBar = (setFilter) => {
  return (
    <div className="SearchBar">
      <div className="search_icon">
        <AiOutlineSearch />
      </div>
      <input
        placeholder="enter post's title to search"
        onChange={(e) => {
          setFilter(e.target.value.toLowerCase());
        }}
      ></input>
    </div>
  );
};

const Sort = ({ setSortOption, setOrder, order }) => {
  return (
    <div className="Sort">
      <select
        onChange={(e) => {
          switch (e.target.value) {
            case "Date":
              setSortOption("createdAt");
              break;
            case "Author":
              setSortOption("author");
              break;
            case "Content":
              setSortOption("content");
              break;
            case "Title":
              setSortOption("title");
              break;
          }

          console.log(e.target.value);
        }}
      >
        <option>Date</option>
        <option>Author</option>
        <option>Content</option>
        <option>Title</option>
      </select>
      <BiSortAlt2
        className="icon"
        onClick={() => {
          setOrder((prev) => prev * -1);
          console.log(order);
        }}
      />
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

const ToolBar = ({ setFilter, setSortOption, order, setOrder }) => {
  return (
    <div className="ToolBar">
      {SearchBar(setFilter)}
      {Sort({ setSortOption, setOrder, order })}
      {/* {TogglePosts()} */}
    </div>
  );
};

export default ToolBar;
