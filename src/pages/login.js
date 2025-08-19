import "../component/Css/login.css";
import mainLogo from "../images/mainLogo.png";
import googleLogo from "../images/google_icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../context/UserContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const BACK_IP = process.env.REACT_APP_BACK_IP;

  const handleLoginInfo = async () => {
    try {
      const response = await axios.post(`https://${BACK_IP}/users/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const decoded = jwtDecode(token);

        // 만료시각 (있을 때만 저장)
        const expire = decoded?.exp ? decoded.exp * 1000 : null;

        // username / user_id 안전 폴백
        const decodedUsername =
          decoded.username || decoded.name || decoded.email || decoded.sub || "";
        const decodedUserId =
          decoded.user_id || decoded.id || decoded.sub || decodedUsername || "사용자 아이디";

        // 로컬 스토리지 저장
        localStorage.setItem("token", token);
        if (expire) localStorage.setItem("token_expire", String(expire));
        localStorage.setItem("user_id", String(decodedUserId));
        localStorage.setItem("username", String(decodedUsername));

        // 전역 상태 업데이트
        setUser({
          username: decodedUsername,
          user_id: decodedUserId,
          token,
        });
        console.log(decodedUserId, decodedUsername);
        navigate("/");
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login_page">
      <div className="login_circle_back"></div>

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
              <img src={googleLogo} alt="google icon" className="google_icon" />
            </div>
            Google 계정으로 로그인
          </div>
        </div>

        <div className="login_button" onClick={handleLoginInfo}>
          로그인
        </div>

        <div className="login_find">아이디/비밀번호 찾기</div>

        <div className="login_toJoin" onClick={() => navigate("/join")}>
          회원가입 하기
        </div>
      </div>
    </div>
  );
}

export default Login;