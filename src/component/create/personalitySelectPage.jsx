import "../../component/Css/selectPages.css";

function PersonalitySelectPage({ personality, setPersonality }) {
  return (
    <div className="select_box">
      <div className="select_container">
        <div className="select_button">다정한</div>
        <div className="select_button">친절한</div>
        <div className="select_button">까칠한</div>
        <div className="select_button">엄격한</div>
      </div>
      <div className="select_container">
        <div className="select_button">느긋한</div>
        <div className="select_button">호기심 많은</div>
        <div className="select_button">상관 없어요!</div>
      </div>
      <div className="select_container">
        <input
          type="text"
          className="input_container"
          placeholder="직접 입력해 주세요!"
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
        />
      </div>
    </div>
  );
}

export default PersonalitySelectPage;
