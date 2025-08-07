import "../component/Css/myPage.css";
import Footer from "../component/footer";
import profile from "../images/default_profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";

function MyPage() {
  //const [userInfo, setUserInfo] = useState(null);
  // 디버깅용
  const [userInfo, setUserInfo] = useState({
    name: "홍길동",
    email: "gildong@example.com",
    birth: "2005-08-07",
    parentName: "홍어머니",
    parentPhone: "010-1234-5678",
    username: "gildong123",
    password: "********",
  });

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      setUserInfo(JSON.parse(stored));
    }
  }, []);

  if (!userInfo) {
    return (
      <div className="myPage_page">
        <p>사용자 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  const isUnder14 = (() => {
    const birthDate = new Date(userInfo.birth);
    const today = new Date();

    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    const isBirthdayPassedThisYear =
      monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);
    const actualAge = isBirthdayPassedThisYear ? age : age - 1;

    return actualAge < 14;
  })();

  return (
    <>
      <div className="myPage_page">
        <div className="tag_container">
          <div className="tag_box">
            <img src={profile} alt="" className="tag_profile" />
            <div className="tag_contour"></div>
            <div className="tag_detailBox">
              <div className="tag_titleBox">
                <div className="tag_idBox">
                  <div className="tag_subId">동화작가</div>
                  <div className="tag_id">{userInfo.username}</div>
                </div>
                <div className="tag_edit">
                  <FontAwesomeIcon icon={faPenToSquare} />
                </div>
              </div>

              <div className="tag_subBox">
                <div className="tag_leftBox">
                  <div className="tag_info">이름: {userInfo.name}</div>
                  <div className="tag_info">비밀번호가: {userInfo.password}</div>
                  <div className="tag_info">이메일: {userInfo.email}</div>
                  {isUnder14 && (
                    <div className="tag_info">
                      보호자 이름: {userInfo.parentName}
                    </div>
                  )}
                  <div className="tag_info">생성한 동화책 수: n 권</div>
                </div>

                <div className="tag_rightBox">
                  <div className="tag_info">가입 날짜: </div>
                  <div className="tag_info">생년월일: {userInfo.birth}</div>
                  <div className="tag_info">간편 로그인: -</div>
                  {isUnder14 && (
                    <div className="tag_info">
                      보호자 연락처: {userInfo.parentPhone}
                    </div>
                  )}
                  <div className="tag_info">공개 동화책 수: n 권</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyPage;
