import React from "react";

const ConfirmDialog = ({ open, onClose, onConfirm, title, message }) => {
  if (!open) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <h3>{title || "Are you sure?"}</h3>
        <p>{message || "This action cannot be undone."}</p>
        <div className="confirm-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="delete-btn" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
