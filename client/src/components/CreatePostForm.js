import React, { useEffect, useState } from "react";
import "./CreatePostForm.css";
import Overlay from "./Overlay.js";

import ClipLoader from "react-spinners/ClipLoader";

import RichTextEditor from "./RichTextEditor.js";
import { createPost } from "../slice/postSlice";
import { useDispatch } from "react-redux";

const CreatePostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  const override = {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  };
  const str = "<p>haha</p>";

  const submitHandler = (e) => {
    console.log(title);
    console.log(content);
    dispatch(createPost({ title, content }));
  };

  return (
    <Overlay>
      <div className="CreatePostForm">
        <div dangerouslySetInnerHTML={{ __html: str }} />
        <form onSubmit={(e) => submitHandler(e)}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type={"text"}
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></input>
          <label htmlFor="content">Content</label>
          <div className="editor">
            <RichTextEditor content={content} setContent={setContent} />
          </div>
          <div className="footer">
            <ClipLoader color="#36d7b7" cssOverride={override} />
            <button>Cancel</button>
            <input type="submit" value={"Confirm"} />
          </div>
        </form>
      </div>
    </Overlay>
  );
};

export default CreatePostForm;
