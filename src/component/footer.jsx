import { Link } from "react-router-dom";
import "../component/Css/footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="underNav_box">
        <Link to="/" className="underNav">
          서비스 소개
        </Link>
        <Link to="/create" className="underNav">
          동화 만들기
        </Link>
        <Link to="/my-gallery" className="underNav">
          나의 동화책
        </Link>
        <Link to="/open-gallery" className="underNav">
          공개 갤러리
        </Link>
      </div>

      <div className="underText_box">
        <Link
          to="/policy"
          state={{ tab: "privacy" }}
          className="underText underLink"
        >
          개인정보처리방침
        </Link>

        <div className="underText">|</div>

        <div className="underText">ⓒ</div>
        <div className="underText">2025</div>
        <div className="underText">SOFTWARE CONVERGENCE</div>
        <div className="underText">GYEONGKUK NATIONAL UNIVERSITY</div>

        <div className="underText">|</div>

        <Link
          to="/policy"
          state={{ tab: "terms" }}
          className="underText underLink"
        >
          이용약관
        </Link>
      </div>
    </div>
  );
}

export default Footer;
