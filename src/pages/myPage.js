import Footer from "../component/footer";
import "../component/Css/myPage.css";
import profile from "../images/default_profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

function MyPage() {
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
                  <div className="tag_id">사용자</div>
                </div>
                <div className="tag_edit"><FontAwesomeIcon icon={faPenToSquare} /></div>
              </div>
              <div className="tag_subBox">
                <div className="tag_leftBox">
                  <div className="tag_info">이름: ○○○</div>
                  <div className="tag_info">비밀번호: ********</div>
                  <div className="tag_info">이메일: asdfghjkl@gmail.com</div>
                  <div className="tag_info">생성한 동화책 수: n 권</div>
                </div>
                <div className="tag_rightBox">
                  <div className="tag_info">가입 날짜: 20XX.XX.XX</div>
                  <div className="tag_info">생년월일: 20XX.XX.XX</div>
                  <div className="tag_info">간편 로그인: </div>
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
