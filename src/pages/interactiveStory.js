import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import "../component/Css/interactiveStory.css";

function InteractiveStory() {
  const flipBookRef = useRef();

  const rawPages = [
    {
      image: "🌄 삽화 1",
      text: "대한민국의 주권은 국민에게 있고, 모든 권력은 국민으로부터 나온다. 국가안전보장에 관련되는 대외정책·군사정책과 국내정책의 수립에 관하여 국무회의의 심의에 앞서 대통령의 자문에 응하기 위하여 국가안전보장회의를 둔다.",
      select1: "선택지 1",
      select2: "선택지 2",
      select3: "선택지 3",
      select4: "선택지 4",
    },
    { image: "🌄 삽화 2", text: "📖 이야기 2" },
    { image: "🌄 삽화 3", text: "📖 이야기 3" },
  ];

  // 삽화와 이야기 각각을 독립된 페이지로 분리
  const pageComponents = rawPages.flatMap((page, idx) => [
    <div key={`image-${idx}`} className="IS_leftBox IS_page">
      {page.image}
    </div>,
    <div key={`text-${idx}`} className="IS_rightBox IS_page">
      <div className="IS_text_box">{page.text}</div>
      <div className="IS_select_box">
        <div className="IS_select_group">
          <div className="IS_select">{page.select1}</div>
          <div className="IS_select">{page.select2}</div>
        </div>
        <div className="IS_select_group">
          <div className="IS_select">{page.select3}</div>
          <div className="IS_select">{page.select4}</div>
        </div>
      </div>
    </div>,
  ]);

  return (
    <div className="interactiveStory_page">
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

export default InteractiveStory;
