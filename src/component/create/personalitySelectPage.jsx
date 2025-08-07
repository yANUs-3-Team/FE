import "../../component/Css/selectPages.css";

function PersonalitySelectPage({ personality, setPersonality }) {
  const options = [
    "다정한", "친절한", "까칠한", "엄격한",
    "느긋한", "호기심 많은", "상관 없어요!",
  ];

  const isCustomInput = !options.includes(personality);

  return (
    <div className="select_box">
      <div className="select_container">
        {options.slice(0, 4).map((option) => (
          <div
            key={option}
            className={`select_button ${personality === option ? "selected" : ""}`}
            onClick={() => setPersonality(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="select_container">
        {options.slice(4).map((option) => (
          <div
            key={option}
            className={`select_button ${personality === option ? "selected" : ""}`}
            onClick={() => setPersonality(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="select_container">
        <input
          type="text"
          className="input_container"
          placeholder="직접 입력해 주세요!"
          value={isCustomInput ? personality : ""}
          onChange={(e) => setPersonality(e.target.value)}
        />
      </div>
    </div>
  );
}

export default PersonalitySelectPage;
