import "./ToolBar.css";
import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BiSortAlt2 } from "react-icons/bi";
import { BsFillGridFill } from "react-icons/bs";
import { RxRows } from "react-icons/rx";

import * as category from "../constant/PostCategory.js";

const CategoryBar = ({ activeCate, setActiveCate }) => {
  // function handleIndicator(el) {
  //   setSliderStyles({
  //     width: el.offsetWidth,
  //     left: el.offsetLeft,
  //   });
  // indicator.style.width = `${el.offsetWidth}px`;
  // indicator.style.left = `${el.offsetLeft}px`;
  // indicator.style.backgroundColor = el.getAttribute("active-color");

  // el.classList.add("is-active");
  // el.style.color = el.getAttribute("active-color");

  // const [sliderStyles, setSliderStyles] = useState({
  //   width: "100px",
  //   left: "0px",
  // });

  return (
    <div className="CategoryBar">
      <ul>
        <li
          className={
            activeCate === category.latestTechnology.var ? "active" : ""
          }
          onClick={(e) => {
            // handleIndicator(e.target);
            setActiveCate(category.latestTechnology.var);
          }}
        >
          Latest Technology
        </li>
        <li
          className={activeCate === category.techNews.var ? "active" : ""}
          onClick={(e) => {
            // handleIndicator(e.target);
            setActiveCate(category.techNews.var);
          }}
        >
          Tech News
        </li>
        <li
          className={
            activeCate === category.cryptocurrencyBlockchain.var ? "active" : ""
          }
          onClick={(e) => {
            // handleIndicator(e.target);
            setActiveCate(category.cryptocurrencyBlockchain.var);
          }}
        >
          Cryptocurrency & Blockchain
        </li>
        <li
          className={activeCate === category.gamingEsports.var ? "active" : ""}
          onClick={(e) => {
            // handleIndicator(e.target);
            setActiveCate(category.gamingEsports.var);
          }}
        >
          Gaming & Esports
        </li>
        <li
          className={activeCate === category.gadgetReviews.var ? "active" : ""}
          onClick={(e) => {
            // handleIndicator(e.target);
            setActiveCate(category.gadgetReviews.var);
          }}
        >
          Gadget Reviews
        </li>
        <li
          className={activeCate === category.lifestyles.var ? "active" : ""}
          onClick={(e) => {
            // handleIndicator(e.target);
            setActiveCate(category.lifestyles.var);
          }}
        >
          Lifestyles
        </li>
        {/* <li className="slide" styles={sliderStyles}></li> */}
      </ul>
    </div>
  );
};

const SearchBar = (setFilter) => {
  return (
    <div className="SearchBar">
      <div className="search_icon">
        <AiOutlineSearch />
      </div>
      <input
        placeholder="SEARCH"
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
        size={25}
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

const ToolBar = ({
  setFilter,
  setSortOption,
  order,
  setOrder,
  displayGrid,
  setDisplayGrid,
  activeCate,
  setActiveCate,
}) => {
  return (
    <div className="ToolBar">
      <div className="first_row">
        {CategoryBar({ activeCate, setActiveCate })}
      </div>
      <div className="second_row">
        {SearchBar(setFilter)}
        {Sort({ setSortOption, setOrder, order })}
        {/* {TogglePosts()} */}
        <div className="icon" onClick={() => setDisplayGrid(true)}>
          <BsFillGridFill size={20} />
        </div>
        <div className="icon" onClick={() => setDisplayGrid(false)}>
          <RxRows size={20} />
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
