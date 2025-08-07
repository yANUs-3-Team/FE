import "../component/Css/myPage.css";
import Footer from "../component/footer";
import { useEffect, useState } from "react";
import MyPageView from "../component/myPage/myPageView";

function MyPage() {
  const [userInfo, setUserInfo] = useState({
    name: "홍길동",
    email: "gildong@example.com",
    birth: "20021-08-07",
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
          <MyPageView userInfo={userInfo} isUnder14={isUnder14} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyPage;
