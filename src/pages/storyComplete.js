import { useNavigate } from "react-router-dom";
import "../component/Css/storyComplete.css";
import charJump from "../images/character_jump.png";

function StoryComplete() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/story-viewer");
  };

  return (
    <div className="storyComplete_page">
      <div className="storyComplete_container" onClick={handleClick}>
        여기에 동화 표지
      </div>
      <img src={charJump} alt="" className="charJump_img" />
    </div>
  );
}

export default StoryComplete;
