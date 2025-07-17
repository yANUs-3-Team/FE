import Footer from "../component/footer";
import "../component/Css/intro.css";
import mainLogo from "../images/mainLogo.png";
import charHalf4 from "../images/character_halfSide4.png";
import starImg from "../images/star_icon.png";
import { useNavigate } from "react-router-dom";

function Intro() {
  const navigate = useNavigate();

  return (
    <>
      <div className="intro_page">
        <div className="intro_container">
          <img
            src={mainLogo}
            alt=""
            className="intro_logo animated animate-left"
          />

          <div className="intro_text_container">
            <div className="intro_text_box animated animate-right delay-1">
              <div className="intro_text">아이들이</div>
              <div className="intro_colorText">직접</div>
              <div className="intro_text">작가가 되어</div>
            </div>
            <div className="intro_text_box animated animate-right delay-2">
              <div className="intro_text">
                동화책을 만들 수 있는 서비스입니다
              </div>
            </div>

            <div
              className="intro_button animated animate-up delay-3"
              onClick={() => navigate("/create")}
            >
              동화 만들러 가기
            </div>
          </div>
        </div>

        <div className="intro_container">
          <div className="intro_speechBubble">
            <p>
              몽글몽글 상상나래는 아이들이 직접 동화책의 작가가 될 수 있는
              기회를 제공합니다.
            </p>
            <p>우리 아이의 무한한 상상력과 창의력을 기대해 보세요!</p>
            <p>
              혁신적인 인공지능 기술이 만들어내는 놀라운 콘텐츠 창조의 세계로
              초대합니다.
            </p>
            <p>
              세상 모든 동화책 속 이야기가 예술로 승화되는 순간을
              함께하겠습니다!
            </p>
          </div>
          <img src={starImg} alt="" className="intro_starImg"></img>

          <img src={charHalf4} alt="" className="intro_char"></img>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Intro;
