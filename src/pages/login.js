import "../component/Css/login.css";
import mainLogo from "../images/mainLogo.png";

function Login() {
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
          <div className="social_login social_kakao">카카오로 5초만에 시작하기</div>
          <div className="social_login social_google">Google 계정으로 로그인</div>
        </div>

        <div className="login_button">로그인</div>

        <div className="login_find">아이디/비밀번호 찾기</div>

        <div className="login_toJoin">회원가입 하기</div>
      </div>
    </div>
  );
}

export default Login;
