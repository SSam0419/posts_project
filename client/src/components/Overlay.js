import React from "react";
import "./Overlay.css";

const Overlay = ({ children, onClose }) => {
  return (
    <div className="Overlay" onClick={onClose}>
      {children}
    </div>
  );
};

export default Overlay;
