import "../../component/Css/selectPages.css";
import { useState } from "react";

function GenreSelectPage({ genre, setGenre }) {
  const options = ["마법", "판타지", "우화", "미스터리", "성장", "고전", "상관 없어요!"];

  const descriptions = {
    마법: "마법 지팡이, 주문, 신기한 물건이 나오는 이야기예요.",
    판타지: "용, 요정, 다른 세상이 나오는 모험 이야기예요.",
    우화: "동물이 사람처럼 말하고 행동하며, 교훈을 주는 이야기예요.",
    미스터리: "숨겨진 비밀을 풀어나가는 흥미로운 이야기예요.",
    성장: "주인공이 배움을 얻고 마음이 자라는 이야기예요.",
    고전: "옛날부터 전해 내려오는 전래 동화예요.",
    "상관 없어요!": "어떤 장르든 좋아요!"
  };

  const [hoveredOption, setHoveredOption] = useState(null);

  const isCustomInput = !options.includes(genre);

  const renderOption = (option) => (
    <div
      key={option}
      className="select_button_wrapper"
      onMouseEnter={() => setHoveredOption(option)}
      onMouseLeave={() => setHoveredOption(null)}
    >
      <div
        className={`select_button ${genre === option ? "selected" : ""}`}
        onClick={() => setGenre(option)}
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
          value={isCustomInput ? genre : ""}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
    </div>
  );
}

export default GenreSelectPage;
