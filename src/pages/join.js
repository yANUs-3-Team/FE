import "../component/Css/join.css";

function Join() {
  return (
    <div className="join_page">
      <div className="join_container">
        <div className="join_box">
          <label className="join_label" htmlFor="name">
            이름
          </label>
          <input className="join_input" id="name" type="text" />
        </div>

        <div className="join_box">
          <label className="join_label" htmlFor="email">
            이메일
          </label>
          <input className="join_input" id="email" type="email" />
        </div>

        <div className="join_box">
          <label className="join_label" htmlFor="birth">
            생년월일
          </label>
          <input className="join_input" id="birth" type="date" />
        </div>

        <div className="join_under14_box">
          <div className="join_under14_text">
            ! 만 14세 미만 아동은 보호자의 이름과 연락처를 아래에 기입해 주세요
          </div>
          <div className="join_under14_infoBox">
            <label className="join_under14_infoLabel" htmlFor="parentName">
              이름
            </label>
            <input
              className="join_under14_infoInput"
              id="parentName"
              type="text"
            />

            <label className="join_under14_infoLabel" htmlFor="parentPhone">
              연락처
            </label>
            <input
              className="join_under14_infoInput"
              id="parentPhone"
              type="tel"
              placeholder="010-0000-0000"
            />
          </div>
        </div>

        <div className="join_box">
          <label className="join_label" htmlFor="username">
            아이디
          </label>
          <input className="join_input" id="username" type="text" />
        </div>

        <div className="join_box">
          <label className="join_label" htmlFor="password">
            비밀번호
          </label>
          <input className="join_input" id="password" type="password" />
        </div>

        <div className="join_box">
          <label className="join_label" htmlFor="passwordConfirm">
            비밀번호 확인
          </label>
          <input className="join_input" id="passwordConfirm" type="password" />
        </div>
      </div>

      <div className="join_container">
        <div className="join_privacy_box">
          <div className="join_privacy_title">
            [ 개인정보 수집·이용 동의서 ]
          </div>
          <div className="join_privacy_detailBox"></div>
          <div className="join_privacy_radio">
            <input
              type="radio"
              id="privacyAgree"
              name="privacy"
              className="join_radio_input"
            />
            <label htmlFor="privacyAgree" className="join_radio_label">
              개인정보 수집·이용에 동의합니다
            </label>
          </div>
        </div>
        <div className="join_privacy_box">
          <div className="join_privacy_title">
            [ 이용약관 ]
          </div>
          <div className="join_privacy_detailBox"></div>
          <div className="join_privacy_radio">
            <input
              type="radio"
              id="privacyAgree"
              name="privacy"
              className="join_radio_input"
            />
            <label htmlFor="privacyAgree" className="join_radio_label">
              이용약관에 동의합니다
            </label>
          </div>
        </div>

        <div className="join_button">가입하기</div>
      </div>

      <div className="join_spring_box">
        {[...Array(7)].map((_, i) => (
          <div key={`spring-${i}`} className="join_spring" />
        ))}
      </div>
    </div>
  );
}

export default Join;
