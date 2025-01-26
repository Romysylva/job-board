// import React, { useState } from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import { useGlobalContext } from "../context/global/GlobalProvider";

// const CommentForm = ({ targetId, targetType, onSuccess }) => {
//   const [open, setOpen] = useState(false);
//   const [text, setText] = useState("");
//   const { showLoading, hideLoading, showError, hideError } = useGlobalContext();

//   const handleSubmit = async () => {
//     showLoading();
//     try {
//       const response = await fetch("http://localhost:5000/api/comments", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ targetId, targetType, text }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to add comment");
//       }

//       const data = await response.json();
//       hideLoading();
//       setOpen(false);
//       setText("");
//       onSuccess(data.comment); // Trigger callback to update parent UI
//     } catch (error) {
//       hideLoading(false);
//       showError(error.message);
//     }
//   };

//   return (
//     <>
//       <Button variant="contained" onClick={() => setOpen(true)}>
//         Add Comment
//       </Button>
//       <Dialog open={open} onClose={() => setOpen(false)}>
//         <DialogTitle>Add Comment</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             multiline
//             rows={4}
//             label="Comment"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             variant="outlined"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)}>Cancel</Button>
//           <Button onClick={handleSubmit} variant="contained" color="primary">
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default CommentForm;

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
