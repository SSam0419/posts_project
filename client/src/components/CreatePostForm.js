import React, { useState } from "react";

import RichTextEditor from "./RichTextEditor.js";
import { createPost } from "../slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../slice/userSlice";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";

import * as _category from "../constant/PostCategory.js";

import { ToastTime } from "../constant/ToastTime.js";

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isContentEmpty, setIsContentEmpty] = useState(true);
  const [isShowCate, setIsShowCate] = useState(false);
  const [categoryText, setCategoryText] = useState("Choose a category");
  const [category, setCategory] = useState(_category.latestTechnology.var);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!user.userProfile.isLoggedIn) {
      notify("create post");
      return;
    }

    const author = user.userProfile.username;
    const authorId = user.userProfile.id;
    dispatch(createPost({ title, content, author, category, authorId }));
  };

  const editorHandler = (content, delta, source, editor) => {
    setContent(content);
    setIsContentEmpty(editor.getText().trim() === "");
  };

  const toastTime = ToastTime();

  const notify = (str) =>
    toast.error(`Log In to ${str}`, {
      position: "top-right",
      autoClose: toastTime,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    // <Overlay onClose={() => setShowForm(false)}>
    // <div className="CreatePostForm" onClick={(e) => e.stopPropagation()}>
    <form onSubmit={(e) => submitHandler(e)}>
      <ToastContainer
        position="top-right"
        autoClose={toastTime}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type={"text"}
        required
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      ></input>
      {selectCategory({
        categoryText,
        isShowCate,
        setIsShowCate,
        setCategoryText,
        setCategory,
      })}
      <label htmlFor="content">Content</label>
      <div className="editor">
        <RichTextEditor content={content} editorHandler={editorHandler} />
      </div>

      <div className="footer">
        <button type="submit" disabled={isContentEmpty} className="submit_btn">
          POST
        </button>
      </div>
    </form>
    // </div>
    // </Overlay>
  );
};

export default CreatePostForm;

const selectCategory = ({
  categoryText,
  isShowCate,
  setIsShowCate,
  setCategoryText,
  setCategory,
}) => {
  return (
    <>
      <div className="category_selector_header">Category : </div>
      <div className="category_selector_container">
        <div
          className={`selector_main_box ${isShowCate ? "showing" : ""}`}
          onClick={() => {
            setIsShowCate((prev) => !prev);
          }}
        >
          {categoryText}
        </div>
        {isShowCate && (
          <div
            className="selector_main_option_container "
            onClick={() => {
              setIsShowCate(false);
            }}
          >
            <div
              className="selector_main_option"
              onClick={(e) => {
                setCategory(_category.latestTechnology.var);
                setCategoryText(_category.latestTechnology.string);
              }}
            >
              Latest Technology
            </div>
            <div
              className="selector_main_option"
              onClick={(e) => {
                setCategory(_category.techNews.var);
                setCategoryText(_category.techNews.string);
              }}
            >
              Tech News
            </div>
            <div
              className="selector_main_option"
              onClick={(e) => {
                setCategory(_category.cryptocurrencyBlockchain.var);
                setCategoryText(_category.cryptocurrencyBlockchain.string);
              }}
            >
              Cryptocurrency & Blockchain
            </div>
            <div
              className="selector_main_option"
              onClick={(e) => {
                setCategory(_category.gamingEsports.var);
                setCategoryText(_category.gamingEsports.string);
              }}
            >
              Gaming & Esports
            </div>
            <div
              className="selector_main_option"
              onClick={(e) => {
                setCategory(_category.gadgetReviews.var);
                setCategoryText(_category.gadgetReviews.string);
              }}
              _category
            >
              Gadget Reviews
            </div>
            <div
              className="selector_main_option"
              onClick={(e) => {
                setCategory(_category.lifestyles.var);
                setCategoryText(_category.lifestyles.string);
              }}
            >
              Lifestyles
            </div>
          </div>
        )}
      </div>
    </>
  );
};
