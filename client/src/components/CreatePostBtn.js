import React, { useState } from "react";
import "./CreatePostBtn.css";
import { FaPlusCircle } from "react-icons/fa";
import CreatePostForm from "./CreatePostForm";

const CreatePostBtn = () => {
  const onClickHandler = () => {};
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      {showForm && <CreatePostForm setShowForm={setShowForm} />}
      <div className="CreatePostBtn">
        <FaPlusCircle
          size={50}
          color={"#007ACC"}
          onClick={() => {
            setShowForm((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
};

export default CreatePostBtn;
