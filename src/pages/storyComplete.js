import "../component/Css/storyComplete.css";
import charJump from "../images/character_jump.png";

function StoryComplete() {
  return (
    <div className="storyComplete_page">
      <div className="storyComplete_container">
        여기에 동화 표지
      </div>
      <img src={charJump} alt="" className="charJump_img" />
    </div>
  );
}

export default StoryComplete;
