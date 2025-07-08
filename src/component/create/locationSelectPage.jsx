import "../../component/Css/selectPages.css";

function LocationSelectPage({ location, setLocation }) {
  const options = [
    "숲속", "도시", "바다", "마을", "학교", "집", "상관 없어요!"
  ];

  // 사용자가 직접 입력한 값인지 여부 확인
  const isCustomInput = !options.includes(location);

  return (
    <div className="select_box">
      <div className="select_container">
        {options.slice(0, 4).map((option) => (
          <div
            key={option}
            className={`select_button ${location === option ? "selected" : ""}`}
            onClick={() => setLocation(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="select_container">
        {options.slice(4).map((option) => (
          <div
            key={option}
            className={`select_button ${location === option ? "selected" : ""}`}
            onClick={() => setLocation(option)}
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
          value={isCustomInput ? location : ""}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
    </div>
  );
}

export default LocationSelectPage;
