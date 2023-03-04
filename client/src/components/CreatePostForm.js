import React, { useEffect, useState } from "react";
import "./CreatePostForm.css";
import Overlay from "./Overlay.js";

import RichTextEditor from "./RichTextEditor.js";
import { createPost } from "../slice/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../slice/userSlice";

const CreatePostForm = ({ setShowForm }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const submitHandler = (e) => {
    const author = user.userProfile.username;
    dispatch(createPost({ title, content, author }));
  };

  return (
    <Overlay onClose={() => setShowForm(false)}>
      <div className="CreatePostForm" onClick={(e) => e.stopPropagation()}>
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
            <button onClick={() => setShowForm(false)}>Cancel</button>
            <input type="submit" value={"Confirm"} />
          </div>
        </form>
      </div>
    </Overlay>
  );
};

export default CreatePostForm;
