import React, { useEffect, useState } from "react";
import "./CreatePostForm.css";
import Overlay from "./Overlay.js";

import ClipLoader from "react-spinners/ClipLoader";

import RichTextEditor from "./RichTextEditor.js";

const CreatePostForm = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    console.log(content);
  }, [content]);

  const override = {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  };
  const str = "<p>haha</p>";
  return (
    <Overlay>
      <div className="CreatePostForm">
        <div dangerouslySetInnerHTML={{ __html: str }} />
        <form>
          <label htmlFor="title">Title</label>
          <input id="title" type={"text"}></input>
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
