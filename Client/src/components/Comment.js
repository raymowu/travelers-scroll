import React from "react";
import "../css/comment.css";
const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <h2 className="comment-username">{comment.Author.username}</h2>
      <h3 className="comment-text">{comment.text} </h3>
    </div>
  );
};

export default Comment;
