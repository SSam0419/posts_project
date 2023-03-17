import React, { useState } from "react";
import "./CreatePostBtn.css";
import { FaPen } from "react-icons/fa";
import CreatePostForm from "./CreatePostForm";

const CreatePostBtn = () => {
  const onClickHandler = () => {};
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      {showForm && <CreatePostForm setShowForm={setShowForm} />}
      <div className="CreatePostBtn">
        <FaPen
          size={30}
          color={"#ffffff"}
          onClick={() => {
            setShowForm((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
};

export default CreatePostBtn;
