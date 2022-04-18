import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa";
import handleOnLike from "../pages/Build";

const LikeButton = ({ liked, handleOnLike }) => {
  if (liked) {
    return <FaThumbsUp onClick={handleOnLike} />;
  } else {
    return <FaRegThumbsUp onClick={handleOnLike} />;
  }
};

export default LikeButton;
