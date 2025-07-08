import "../../component/Css/selectPages.css";

function NameInputPage({ name, setName, handleRandomName }) {
  return (
    <div className="select_box">
      <div className="select_container">
        <input
          type="text"
          name="name"
          className="input_container"
          placeholder="이름을 입력해 주세요!"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="random_button" onClick={handleRandomName}>
          랜덤!
        </div>
      </div>
    </div>
  );
}

export default NameInputPage;
