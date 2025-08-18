import "../../component/Css/summaryPage.css";

function SummaryPage({
  name,
  personality,
  endingpoint,
  setEndingpoint,
  characteristics,
  location,
  era,
  genre,
  visibility,
  setVisibility,
  setPageIndex,
  navigate,
}) {
  return (
    <div className="select_box2">
      <div className="select_container2">
        <div className="selected_group">
          <div className="selected_label2">주인공의 이름</div>
          <div className="selected_value">{name || "선택되지 않음"}</div>
        </div>
        <div className="selected_group">
          <div className="selected_label2">주인공의 성격</div>
          <div className="selected_value">{personality || "선택되지 않음"}</div>
        </div>
        <div className="selected_group">
          <label className="selected_label2" htmlFor="endingCount">
            페이지 수
          </label>
          <input
            id="endingCount"
            type="number"
            className="selected_value endingCount"
            value={endingpoint ?? ""}
            min={1}
            max={100}
            step={1}
            onChange={(e) => {
              const v = e.target.value;
              if (v === "") {
                setEndingpoint("");
                return;
              }
              const n = parseInt(v, 10);
              if (Number.isNaN(n)) return;
              const clamped = Math.max(1, Math.min(100, n));
              setEndingpoint(clamped);
            }}
          />
        </div>
      </div>
      <div className="select_container2">
        <div className="selected_group">
          <div className="selected_label">주인공의 특징</div>
          <div className="selected_value2">
            {characteristics || "선택되지 않음"}
          </div>
        </div>
      </div>
      <div className="select_container2">
        <div className="selected_group">
          <div className="selected_label2">시작 장소</div>
          <div className="selected_value">{location || "선택되지 않음"}</div>
        </div>
        <div className="selected_group">
          <div className="selected_label2">시대</div>
          <div className="selected_value">{era || "선택되지 않음"}</div>
        </div>
        <div className="selected_group">
          <div className="selected_label2">장르</div>
          <div className="selected_value">{genre || "선택되지 않음"}</div>
        </div>
      </div>
      <div className="select_container">
        <label className="radio_label">
          <input
            type="radio"
            name="visibility"
            value="private"
            checked={visibility === "private"}
            onChange={() => setVisibility("private")}
          />
          나만 보기
        </label>
        <label className="radio_label">
          <input
            type="radio"
            name="visibility"
            value="public"
            checked={visibility === "public"}
            onChange={() => setVisibility("public")}
          />
          전체 공개
        </label>
      </div>
      <div className="pagination_box">
        <div
          className="pagination_button left_button"
          onClick={() => setPageIndex(0)}
        >
          설정 바꾸기
        </div>
        <div
          className="pagination_button right_button"
          onClick={() => {
            const n = parseInt(endingpoint, 10);
            if (!Number.isInteger(n) || n < 1) {
              alert("엔딩페이지 수를 1 이상의 정수로 입력해 주세요.");
              return;
            }
            navigate("/loading");
          }}
        >
          동화 만들기
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
