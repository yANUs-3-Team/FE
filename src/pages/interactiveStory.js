// src/pages/InteractiveStory.js
import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "../component/Css/interactiveStory.css";
import Illust from "../images/test_illustration.png";

function InteractiveStory() {
  const flipBookRef = useRef(null);

  const rawPages = [
    {
      image: Illust, // ✅ import된 PNG -> 문자열 URL
      text: "윈터는 화려한 금색 단발을 휘날리며 성 안에서 즐겁게 뛰어놀고 있었다. 그러던 중, 창문 너머로 낯선 빛이 들어오는 것을 보았다.",
      select1: "방 안에서 나비에게 조심스럽게 인사를 건넨다.",
      select2: "방 안을 둘러보면서 나비와의 특별한 만남을 상상한다.",
      select3: "나비를 쫓아다니며 장난을 치고 싶어진다.",
      select4: "나비 쪽을 향해 손을 뻗는다.",
    },
    { image: "🌄 삽화 2", text: "📖 이야기 2" }, // 이건 텍스트(이모지)로 렌더
    { image: "🌄 삽화 3", text: "📖 이야기 3" },
  ];

  const handleChoiceClick = (choiceText) => {
    // TODO: choiceText로 AI 호출 → 다음 컨텐츠 받아서 상태 업데이트
    flipBookRef.current?.pageFlip()?.flipNext();
  };

  const isImageUrlLike = (v) =>
    typeof v === "string" &&
    (v.startsWith("http") ||
      v.startsWith("/") ||
      v.startsWith("blob:") ||
      v.startsWith("data:") ||
      /\.(png|jpe?g|gif|webp|svg)$/i.test(v));

  const pageComponents = rawPages.flatMap((page, idx) => [
    <div key={`image-${idx}`} className="IS_leftBox IS_page">
      {isImageUrlLike(page.image) ? (
        <img src={page.image} alt="" className="IS_illust" />
      ) : (
        <div className="IS_illustPlaceholder">{String(page.image)}</div>
      )}
    </div>,
    <div key={`text-${idx}`} className="IS_rightBox IS_page">
      <div className="IS_text_box">{page.text}</div>
      <div className="IS_select_box">
        {page.select1 && (
          <button
            className="IS_select"
            onClick={() => handleChoiceClick(page.select1)}
          >
            {page.select1}
          </button>
        )}
        {page.select2 && (
          <button
            className="IS_select"
            onClick={() => handleChoiceClick(page.select2)}
          >
            {page.select2}
          </button>
        )}
        {page.select3 && (
          <button
            className="IS_select"
            onClick={() => handleChoiceClick(page.select3)}
          >
            {page.select3}
          </button>
        )}
        {page.select4 && (
          <button
            className="IS_select"
            onClick={() => handleChoiceClick(page.select4)}
          >
            {page.select4}
          </button>
        )}
        {/* 보류 */}
        {/**<input
          type="text"
          className="IS_select_input"
          placeholder="당신이 직접 입력해 보세요!"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim()) {
              handleChoiceClick(e.currentTarget.value.trim());
            }
          }}
        /> */}
      </div>
    </div>,
  ]);

  return (
    <div className="interactiveStory_page">
      <HTMLFlipBook
        ref={flipBookRef}
        width={1}
        height={1}
        size="stretch"
        showCover={false}
        maxShadowOpacity={0.5}
        drawShadow
        flippingTime={800}
        useMouseEvents={false}
        mobileScrollSupport={false}
        style={{ width: "80vw", height: "80vh" }}
      >
        {pageComponents}
      </HTMLFlipBook>
    </div>
  );
}

export default InteractiveStory;
