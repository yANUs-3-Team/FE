import "../component/Css/login.css";
import mainLogo from "../images/mainLogo.png";
import googleLogo from "../images/google_icon.png";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="login_page">
      <div className="login_circle_back"></div>

      <div className="login_container">
        <div className="login_circle_front">
          <img src={mainLogo} alt="main logo" className="login_logo" />
        </div>

        <input type="text" placeholder="아이디" className="login_input" />
        <input type="password" placeholder="비밀번호" className="login_input" />

        <div className="social_login_box">
          <div className="social_login social_kakao">
            <div className="social_icon_box">
              <div className="kakao_icon"></div>
            </div>
            Kakao 계정으로 로그인
          </div>
          <div className="social_login social_google">
            <div className="social_icon_box">
              <img src={googleLogo} alt="" className="google_icon"></img>
            </div>
            Google 계정으로 로그인
          </div>
        </div>

        <div className="login_button">로그인</div>

        <div className="login_find">아이디/비밀번호 찾기</div>

        <div className="login_toJoin" onClick={() => navigate("/join")}>
          회원가입 하기
        </div>
      </div>
    </div>
  );
}

export default Login;
