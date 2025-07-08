import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "../component/Css/storyViewer.css";

function StoryViewer() {
  const flipBookRef = useRef();

  const rawPages = [
    { image: "🌄 삽화 1", text: "📖 이야기 1" },
    { image: "🌄 삽화 2", text: "📖 이야기 2" },
    { image: "🌄 삽화 3", text: "📖 이야기 3" },
  ];

  // 삽화와 이야기 각각을 독립된 페이지로 분리
  const pageComponents = rawPages.flatMap((page, idx) => [
    <div key={`image-${idx}`} className="story_leftBox page">
      {page.image}
    </div>,
    <div key={`text-${idx}`} className="story_rightBox page">
      {page.text}
    </div>,
  ]);

  return (
    <div className="storyViewer_page">
      <HTMLFlipBook
        width={1}
        height={1}
        size="stretch"
        showCover={false}
        ref={flipBookRef}
        maxShadowOpacity={0.5}
        useMouseEvents
        drawShadow
        flippingTime={800}
        style={{ width: "80vw", height: "80vh" }}
      >
        {pageComponents}
      </HTMLFlipBook>
    </div>
  );
}

export default StoryViewer;
