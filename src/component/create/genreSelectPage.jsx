import "../../component/Css/selectPages.css";

function GenreSelectPage({ genre, setGenre }) {
  const options = ["판타지", "마법", "우화", "미스터리", "고전", "자연", "상관 없어요!"];

  const isCustomInput = !options.includes(genre);

  return (
    <div className="select_box">
      <div className="select_container">
        {options.slice(0, 4).map((option) => (
          <div
            key={option}
            className={`select_button ${genre === option ? "selected" : ""}`}
            onClick={() => setGenre(option)}
          >
            {option}
          </div>
        ))}
      </div>
      <div className="select_container">
        {options.slice(4).map((option) => (
          <div
            key={option}
            className={`select_button ${genre === option ? "selected" : ""}`}
            onClick={() => setGenre(option)}
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
          value={isCustomInput ? genre : ""}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
    </div>
  );
}

export default GenreSelectPage;
