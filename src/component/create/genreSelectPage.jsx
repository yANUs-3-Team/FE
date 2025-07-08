import "../../component/Css/selectPages.css";

function GenreSelectPage({ genre, setGenre }) {
  const handleClick = (value) => {
    setGenre(value);
  };

  return (
    <div className="select_box">
      <div className="select_container">
        <div className="select_button" onClick={() => handleClick("판타지")}>판타지</div>
        <div className="select_button" onClick={() => handleClick("마법")}>마법</div>
        <div className="select_button" onClick={() => handleClick("우화")}>우화</div>
        <div className="select_button" onClick={() => handleClick("미스터리")}>미스터리</div>
      </div>
      <div className="select_container">
        <div className="select_button" onClick={() => handleClick("고전")}>고전</div>
        <div className="select_button" onClick={() => handleClick("자연")}>자연</div>
        <div className="select_button" onClick={() => handleClick("상관 없어요!")}>상관 없어요!</div>
      </div>
      <div className="select_container">
        <input
          type="text"
          className="input_container"
          placeholder="직접 입력해 주세요!"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
    </div>
  );
}

export default GenreSelectPage;