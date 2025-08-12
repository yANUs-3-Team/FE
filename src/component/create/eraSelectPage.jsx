import "../../component/Css/selectPages.css";
import { useState } from "react";

function EraSelectPage({ era, setEra }) {
  const options = [
    "원시",
    "고대",
    "중세",
    "근대",
    "현대",
    "미래",
    "상관 없어요!",
  ];

  const descriptions = {
  원시: "동굴에 살고 불을 쓰기 시작한 때",
  고대: "돌기둥과 왕국이 있던 먼 옛날",
  중세: "성과 기사, 마차로 다니던 시대",
  근대: "기차와 공장이 생기기 시작한 때",
  현대: "전기와 인터넷이 있는 지금",
  미래: "우주와 로봇이 가까운 다음 시대", 
  "상관 없어요!": "어떤 시대든 좋아요!"
};

  const [hoveredOption, setHoveredOption] = useState(null);
  const isCustomInput = !options.includes(era);

  const renderOption = (option) => (
    <div
      key={option}
      className="select_button_wrapper"
      onMouseEnter={() => setHoveredOption(option)}
      onMouseLeave={() => setHoveredOption(null)}
    >
      <div
        className={`select_button ${era === option ? "selected" : ""}`}
        onClick={() => setEra(option)}
      >
        {option}
      </div>

      {hoveredOption === option && (
        <div className="select_button_description">
          {descriptions[option]}
        </div>
      )}
    </div>
  );

  return (
    <div className="select_box">
      <div className="select_container">
        {options.slice(0, 4).map(renderOption)}
      </div>

      <div className="select_container">
        {options.slice(4).map(renderOption)}
      </div>

      <div className="select_container">
        <input
          type="text"
          className="input_container"
          placeholder="직접 입력해 주세요!"
          value={isCustomInput ? era : ""}
          onChange={(e) => setEra(e.target.value)}
        />
      </div>
    </div>
  );
}

export default EraSelectPage;