import React from "react";
import "../css/comment.css";
const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <h2 className="comment-username">{comment.Author.username}</h2>
      <div className="break"></div>
      <h3 className="comment-text">{comment.text} </h3>
      <div className="break"></div>
    </div>
  );
};

export default Comment;
