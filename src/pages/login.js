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
      const response = await axios.post(`https://${BACK_IP}/api/users/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const decoded = jwtDecode(token);
        const expire = decoded.exp * 1000;

        localStorage.setItem("token", token);
        localStorage.setItem("token_expire", expire);

        setUser({ username: decoded.username, token });
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
