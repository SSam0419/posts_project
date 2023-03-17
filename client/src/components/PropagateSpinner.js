import React, { CSSProperties } from "react";

import PropagateLoader from "react-spinners/PropagateLoader";

const override = {
  display: "absolute",
  top: "50%",
  left: "50%",
  height: "100%",
  width: "100%",
  margin: "40px auto",
};

const PropagateSpinner = () => {
  return (
    <div className="PropagateSpinner">
      <PropagateLoader color="#36d7b7" cssOverride={override} />
    </div>
  );
};

export default PropagateSpinner;
