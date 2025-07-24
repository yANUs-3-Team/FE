import "../component/Css/join.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Join() {
  const [isUnder14, setIsUnder14] = useState(false);
  const [termsText, setTermsText] = useState("");
  const [privacyText, setPrivacyText] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleBirthChange = (e) => {
    const inputDate = e.target.value;
    setBirth(inputDate);

    const birthDate = new Date(inputDate);
    const today = new Date();

    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    const isBirthdayPassedThisYear =
      monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);
    const actualAge = isBirthdayPassedThisYear ? age : age - 1;

    setIsUnder14(actualAge < 14);
  };

  const handleJoin = async () => {
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    await handleUserInfo();
  };

  const requiredFilled =
    name &&
    email &&
    birth &&
    username &&
    password &&
    passwordConfirm &&
    (!isUnder14 || (parentName && parentPhone));

  const canSubmit = privacyAgreed && termsAgreed && requiredFilled;

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/terms.txt")
      .then((res) => res.text())
      .then((text) => setTermsText(text));

    fetch("/privacy.txt")
      .then((res) => res.text())
      .then((text) => setPrivacyText(text));
  }, []);

  const BACK_IP = process.env.REACT_APP_BACK_IP;

  const handleUserInfo = async () => {
    try {
      const response = await axios.post(
        `https://${BACK_IP}/api/users/register`, // 이부분 이제 localhost에서 주소 바뀌면 내가 알려줄게
        {
          name,
          email,
          birth,
          parentName,
          parentPhone,
          username,
          password,
        }
      );
      console.log("서버 응답:", response.data);

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="join_page">
      <div className="join_container">
        <div className="join_box">
          <label className="join_label" htmlFor="name">
            이름
          </label>
          <input
            className="join_input"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="join_box">
          <label className="join_label" htmlFor="email">
            이메일
          </label>
          <input
            className="join_input"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="join_box">
          <label className="join_label" htmlFor="birth">
            생년월일
          </label>
          <input
            className="join_input"
            id="birth"
            type="date"
            value={birth}
            onChange={handleBirthChange}
          />
        </div>

        <div
          className="join_under14_box"
          style={{
            visibility: isUnder14 ? "visible" : "hidden",
            opacity: isUnder14 ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
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
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
            />

            <label className="join_under14_infoLabel" htmlFor="parentPhone">
              연락처
            </label>
            <input
              className="join_under14_infoInput"
              id="parentPhone"
              type="tel"
              value={parentPhone}
              onChange={(e) => setParentPhone(e.target.value)}
            />
          </div>
        </div>

        <div className="join_box">
          <label className="join_label" htmlFor="username">
            아이디
          </label>
          <input
            className="join_input"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="join_idCheck_button">중복 확인</div>
        </div>

        <div className="join_box">
          <label className="join_label" htmlFor="password">
            비밀번호
          </label>
          <input
            className="join_input"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="join_box">
          <label className="join_label" htmlFor="passwordConfirm">
            비밀번호 확인
          </label>
          <input
            className="join_input"
            id="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
      </div>

      <div className="join_container">
        <div className="join_radio_box">
          <div className="join_radio_title">
            [ 개인정보 수집 · 이용 동의서 ]
          </div>
          <div className="scroll_wrapper">
            <div className="join_radio_detailBox">{privacyText}</div>
          </div>
          <div className="join_radio">
            <input
              type="radio"
              id="privacyAgree"
              name="privacy"
              className="join_radio_input"
              onChange={() => setPrivacyAgreed(true)}
            />
            <label htmlFor="privacyAgree" className="join_radio_label">
              개인정보 수집·이용에 동의합니다
            </label>
          </div>
        </div>

        <div className="join_radio_box">
          <div className="join_radio_title">[ 이용약관 ]</div>
          <div className="scroll_wrapper">
            <div className="join_radio_detailBox">{termsText}</div>
          </div>
          <div className="join_radio">
            <input
              type="radio"
              id="termsAgree"
              name="terms"
              className="join_radio_input"
              onChange={() => setTermsAgreed(true)}
            />
            <label htmlFor="termsAgree" className="join_radio_label">
              이용약관에 동의합니다
            </label>
          </div>
        </div>

        <div
          className={`join_button ${canSubmit ? "active" : ""}`}
          style={{ pointerEvents: canSubmit ? "auto" : "none" }}
          onClick={canSubmit ? handleJoin : undefined}
        >
          가입하기
        </div>
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
