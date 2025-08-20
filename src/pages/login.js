import "../component/Css/login.css";
import mainLogo from "../images/mainLogo.png";
import googleLogo from "../images/google_icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const BACK_IP = process.env.REACT_APP_BACK_IP;

  // axios 인스턴스 (쿠키 포함 전송)
  const api = axios.create({
    baseURL: `https://${BACK_IP}`,
    withCredentials: true, // ★ 중요: 쿠키 전송
    xsrfCookieName: "XSRF-TOKEN", // (선택)
    xsrfHeaderName: "X-XSRF-TOKEN", // (선택)
    headers: { "ngrok-skip-browser-warning": "true" },
  });

  const handleLoginInfo = async () => {
    try {
      const res = await api.post(
        "/users/login",
        { username, password },
        { headers: { "Content-Type": "application/json" } }
      );

      let user = res?.data?.user;

      // 쿠키 기반 인증으로 다시 확인
      if (!user) {
        const me = await api.get("/users/me");
        user = me?.data?.user || me?.data;
      }

      if (!user) {
        alert("사용자 정보를 불러오지 못했습니다.");
        return;
      }

      setUser({
        username: user.username,
        user_id: user.user_id,
      });

      navigate("/");
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login_page">
      <div className="login_circle_back"></div>

      {/* ✅ form으로 감싸되, .login_container는 그대로 둔다 */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLoginInfo();
        }}
      >
        <div className="login_container">
          <div className="login_circle_front">
            <img src={mainLogo} alt="main logo" className="login_logo" />
          </div>

          <input
            type="text"
            placeholder="아이디"
            className="login_input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="login_input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="social_login_box">
            <div className="social_login social_kakao">
              <div className="social_icon_box">
                <div className="kakao_icon"></div>
              </div>
              Kakao 계정으로 로그인
            </div>
            <div className="social_login social_google">
              <div className="social_icon_box">
                <img
                  src={googleLogo}
                  alt="google icon"
                  className="google_icon"
                />
              </div>
              Google 계정으로 로그인
            </div>
          </div>

          {/* ✅ submit 버튼으로 변경 */}
          <button type="submit" className="login_button">
            로그인
          </button>

          <div className="login_find">아이디/비밀번호 찾기</div>

          <div className="login_toJoin" onClick={() => navigate("/join")}>
            회원가입 하기
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
