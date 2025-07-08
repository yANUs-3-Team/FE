import "../../component/Css/selectPages.css";

function CharacteristicsInputPage({ characteristics, onChange }) {
  return (
    <div className="select_box">
      <div
        className="select_container"
        style={{ flexDirection: "column", gap: "1vh" }}
      >
        <textarea
          className="textarea_container"
          value={characteristics}
          onChange={(e) => onChange(e.target.value)}
          placeholder=""
        />
        <div className="placeholder_fallback">
          직접 입력해 주세요! <br />예) 단발의 붉은 머리카락. 여자. 인간
        </div>
      </div>
    </div>
  );
}

export default CharacteristicsInputPage;
