import "../../component/Css/selectPages.css";

function EraSelectPage({ era, setEra }) {
  const options = ["고대", "중세", "현대", "미래", "원시", "신화", "상관 없어요!"];

  const isCustomInput = !options.includes(era);

  return (
    <div className="select_box">
      <div className="select_container">
        {options.slice(0, 4).map((label) => (
          <div
            key={label}
            className={`select_button ${era === label ? "selected" : ""}`}
            onClick={() => setEra(label)}
          >
            {label}
          </div>
        ))}
      </div>
      <div className="select_container">
        {options.slice(4).map((label) => (
          <div
            key={label}
            className={`select_button ${era === label ? "selected" : ""}`}
            onClick={() => setEra(label)}
          >
            {label}
          </div>
        ))}
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
