import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";

const LikeButton = ({ liked, handleOnLike }) => {
  if (liked) {
    return <FaThumbsUp className="like-button-liked" onClick={handleOnLike} />;
  } else {
    return <FaRegThumbsUp className="like-button" onClick={handleOnLike} />;
  }
};

export default LikeButton;
