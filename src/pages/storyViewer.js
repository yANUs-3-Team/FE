import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "../component/Css/storyViewer.css";
import { useNavigate, useLocation } from "react-router-dom";
import Illust from "../images/test_illustration.png";

function StoryViewer() {
  const navigate = useNavigate();
  const location = useLocation();

  const flipBookRef = useRef(null);
  const containerRef = useRef(null);

  const [bookSize] = useState({ width: 600, height: 800 }); // 기본값

  const rawPages = [
    {
      image: Illust, // ✅ import된 PNG -> 문자열 URL
      text: "윈터는 화려한 금색 단발을 휘날리며 성 안에서 즐겁게 뛰어놀고 있었다. 그러던 중, 창문 너머로 낯선 빛이 들어오는 것을 보았다.",
    },
    { image: "🌄 삽화 2", text: "📖 이야기 2" }, // 이건 텍스트(이모지)로 렌더
    { image: "🌄 삽화 3", text: "📖 이야기 3" },
  ];

  const renderSpread = (page, idx) => {
    return [
      <div key={`image-${idx}`} className="SV_leftBox SV_page">
        <img src={page.image} alt="" className="SV_illust" />
      </div>,
      <div key={`text-${idx}`} className="SV_rightBox SV_page">
        <div className="SV_rightGroup">
          <div className="SV_text_box">{page.text}</div>
        </div>
      </div>,
    ];
  };

  const pagesToRender =
    rawPages.length > 0 ? rawPages.flatMap(renderSpread) : [];

  return (
    <div className="interactiveStory_page">
      <div className="SV_pageBox" ref={containerRef}>
        <HTMLFlipBook
          ref={flipBookRef}
          width={bookSize.width}
          height={bookSize.height}
          size="stretch"
          showCover={false}
          maxShadowOpacity={0.5}
          drawShadow
          flippingTime={800}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {pagesToRender}
        </HTMLFlipBook>
      </div>

      <div
        className="SV_exit_button"
        onClick={() => {
          const from = location.state?.from; // 있으면 사용
          console.log("from 값:", from);

          if (from === "interactiveStory" || from === "/interactive-story") {
            navigate("/");
          } else if (from === "myGallery" || from === "/my-gallery") {
            navigate("/my-gallery");
          } else if (from === "openGallery" || from === "/open-gallery") {
            navigate("/open-gallery");
          } else {
            alert("error");
          }
        }}
      >
        🔙 나가기
      </div>
    </div>
  );
}

export default StoryViewer;
