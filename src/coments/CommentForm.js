

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { useGlobalContext } from "../context/global/GlobalProvider";

const CommentForm = ({ open, onClose, onSubmit, targetId, targetType }) => {
  const [commentText, setCommentText] = useState("");
  const { showError, isLoading, clearError, showLoading, hideLoading } =
    useGlobalContext();

  const handleSubmit = async () => {
    showLoading(true);
    clearError();

    const commentData = {
      commentText,
      targetId, // Passed from props
      targetType, // Passed from props
    };

    try {
      await onSubmit(commentData);
      setCommentText(""); // Clear input field on success
      onClose(); // Close dialog
    } catch (err) {
      showError("Failed to post comment. Please try again.");
    } finally {
      hideLoading();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Post a Comment</DialogTitle>
      <DialogContent>
        {isLoading && showLoading()}
        {showError && showError()}
        <TextField
          label="Comment"
          fullWidth
          multiline
          rows={4}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Target Type"
          fullWidth
          value={targetType}
          margin="normal"
          disabled
        />
        <TextField
          label="Target ID"
          fullWidth
          value={targetId}
          margin="normal"
          disabled
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={isLoading || !commentText.trim()}
        >
          Post Comment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentForm;
