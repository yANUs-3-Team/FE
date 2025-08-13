import "../Css/myPageView.css";
import profile from "../../images/default_profile.png";
import starIcon from "../../images/star_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

function MyPageView({ userInfo, isUnder14, onEdit }) {
  return (
    <div className="tag_box">
      <img src={profile} alt="" className="tag_profile" />
      <div className="concave-diamond star1"></div>
      <div className="concave-diamond star2"></div>
      <div className="concave-diamond star3"></div>
      <div className="concave-diamond star4"></div>
      <div className="tag_contour"></div>
      <div className="tag_detailBox">
        <img src={starIcon} alt="" className="tag_starIcon" />
        <div className="tag_titleBox">
          <div className="tag_idBox">
            <div className="tag_subId">동화작가</div>
            <div className="tag_id">{userInfo.username}</div>
          </div>
          <div className="tag_edit" onClick={onEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
        </div>

        <div className="tag_subBox">
          <div className="tag_leftBox">
            <div className="tag_infoBox">
              <div className="tag_label">이름</div>
              <div className="tag_info">: {userInfo.name}</div>
            </div>
            <div className="tag_infoBox">
              <div className="tag_label">비밀번호</div>
              <div className="tag_info">: {userInfo.password}</div>
            </div>
            <div className="tag_infoBox">
              <div className="tag_label">이메일</div>
              <div className="tag_info">: {userInfo.email}</div>
            </div>
            {isUnder14 && (
              <div className="tag_infoBox">
                <div className="tag_label">보호자 이름</div>
                <div className="tag_info">: {userInfo.parentName}</div>
              </div>
            )}
            <div className="tag_infoBox">
              <div className="tag_label">생성한 동화책 수</div>
              <div className="tag_info">: n 권</div>
            </div>
          </div>

          <div className="tag_rightBox">
            <div className="tag_infoBox">
              <div className="tag_label">가입 날짜</div>
              <div className="tag_info">: </div>
            </div>
            <div className="tag_infoBox">
              <div className="tag_label">생년월일</div>
              <div className="tag_info">: {userInfo.birth}</div>
            </div>
            <div className="tag_infoBox">
              <div className="tag_label">간편 로그인</div>
              <div className="tag_info">: -</div>
            </div>
            {isUnder14 && (
              <div className="tag_infoBox">
                <div className="tag_label">보호자 연락처</div>
                <div className="tag_info">: {userInfo.parentPhone}</div>
              </div>
            )}
            <div className="tag_infoBox">
              <div className="tag_label">공개 동화책 수</div>
              <div className="tag_info">: n 권</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPageView;
