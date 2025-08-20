import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "../component/Css/storyViewer.css";
import Illust from "../images/test_illustration.png";

function StoryViewer() {
  const flipBookRef = useRef(null);
  const containerRef = useRef(null); 

  const [bookSize] = useState({ width: 600, height: 800 }); // 기본값

  const rawPages = [
    {
      image: Illust, // ✅ import된 PNG -> 문자열 URL
      text: "윈터는 화려한 금색 단발을 휘날리며 성 안에서 즐겁게 뛰어놀고 있었다. 그러던 중, 창문 너머로 낯선 빛이 들어오는 것을 보았다.",
      select1: "방 안에서 나비에게 조심스럽게 인사를 건넨다.",
      select2: "방 안을 둘러보면서 나비와의 특별한 만남을 상상한다.",
      select3: "나비를 쫓아다니며 장난을 치고 싶어진다.",
      select4: "나비를 쫓아다니며 장난을 치고 싶어진다.",
    },
    { image: "🌄 삽화 2", text: "📖 이야기 2" }, // 이건 텍스트(이모지)로 렌더
    { image: "🌄 삽화 3", text: "📖 이야기 3" },
  ];

  const renderSpread = (page, idx) => {
    return [
      <div key={`image-${idx}`} className="IS_leftBox IS_page">
        <img src={page.image} alt="" className="IS_illust" />
      </div>,
      <div key={`text-${idx}`} className="IS_rightBox IS_page">
        <div className="IS_rightGroup">
          <div className="IS_text_box">{page.text}</div>
          <div className="IS_select_box">
            {page.finish ? (
              <button className="IS_select">끝내기</button>
            ) : (
              // 일반 선택지
              [page.select1, page.select2, page.select3, page.select4]
                .filter(Boolean)
                .map((label, i) => (
                  <button key={`${idx}-sel-${i}`} className="IS_select">
                    {label}
                  </button>
                ))
            )}
          </div>
        </div>
      </div>,
    ];
  };

  const pagesToRender =
    rawPages.length > 0 ? rawPages.flatMap(renderSpread) : [];

  return (
    <div className="interactiveStory_page">
      <div className="IS_pageBox" ref={containerRef}>
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
    </div>
  );
}

export default StoryViewer;
