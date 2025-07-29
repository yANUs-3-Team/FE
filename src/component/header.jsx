import { Link } from "react-router-dom";
import "../component/Css/header.css";
import headerLogo from "../images/headerLogo.png";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Header() {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <div className="header">
      <img src={headerLogo} alt="" className="headerLogo" />

      <div className="nav_container">
        <div className="nav_box">
          <Link to="/" className="nav">
            서비스 소개
          </Link>
          <Link to="/create" className="nav">
            동화 만들기
          </Link>
          <Link to="/my-gallery" className="nav">
            나의 동화책
          </Link>
          <Link to="/open-gallery" className="nav">
            공개 갤러리
          </Link>
        </div>

        <div className="nav_box">
          {user ? (
            <>
              <div className="user_dropdown">
                <div className="nav username">{user.username}님</div>
                <div className="myBox">
                  <div className="dropdown_item">마이페이지</div>
                  <div className="dropdown_item" onClick={handleLogout}>
                    로그아웃
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav">
                로그인
              </Link>
              <Link to="/join" className="nav">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
