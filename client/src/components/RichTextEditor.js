import React, { Component } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./RichTextEditor.css";

const Editor = ({ content, editorHandler }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript

      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "video",
  ];

  return (
    <ReactQuill
      placeholder="Start sharing content !"
      theme="snow"
      modules={modules}
      formats={formats}
      value={content}
      onChange={editorHandler}
    ></ReactQuill>
  );
};

export default Editor;
