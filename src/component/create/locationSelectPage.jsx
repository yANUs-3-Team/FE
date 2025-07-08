import "../../component/Css/selectPages.css";

function LocationSelectPage({ location, setLocation }) {
  return (
    <div className="select_box">
      <div className="select_container">
        <div className="select_button" onClick={() => setLocation("숲속")}>숲속</div>
        <div className="select_button" onClick={() => setLocation("도시")}>도시</div>
        <div className="select_button" onClick={() => setLocation("바다")}>바다</div>
        <div className="select_button" onClick={() => setLocation("마을")}>마을</div>
      </div>
      <div className="select_container">
        <div className="select_button" onClick={() => setLocation("학교")}>학교</div>
        <div className="select_button" onClick={() => setLocation("집")}>집</div>
        <div className="select_button" onClick={() => setLocation("상관 없어요!")}>상관 없어요!</div>
      </div>
      <div className="select_container">
        <input
          type="text"
          className="input_container"
          placeholder="직접 입력해 주세요!"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
    </div>
  );
}

export default LocationSelectPage;
