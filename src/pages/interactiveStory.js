import { useRef, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import axios from "axios";
import "../component/Css/interactiveStory.css";

/** ===== 환경 상수 ===== */
const BACK_IP = process.env.REACT_APP_BACK_IP;
const API_BASE =
  process.env.NODE_ENV === "development" ? "/" : `https://${BACK_IP}`;
const ORIGIN = `https://${BACK_IP}`;

/** ===== 유틸 ===== */
const toPage = (p) => ({
  image:
    typeof p?.image === "string" && p.image.startsWith("/")
      ? `${ORIGIN}${p.image}`
      : p?.image ?? "",
  text: p?.story ?? "",
  select1: p?.choices_1 ?? p?.choice_1 ?? "",
  select2: p?.choices_2 ?? p?.choice_2 ?? "",
  select3: p?.choices_3 ?? p?.choice_3 ?? "",
  select4: p?.choices_4 ?? p?.choice_4 ?? "",
});

/*
const isImageUrlLike = (v) =>
  typeof v === "string" &&
  (v.startsWith("http") ||
    v.startsWith("/") ||
    v.startsWith("blob:") ||
    v.startsWith("data:") ||
    /\.(png|jpe?g|gif|webp|svg)$/i.test(v));*/

/** ===== 컴포넌트 ===== */
function InteractiveStory() {
  const flipBookRef = useRef(null);
  const containerRef = useRef(null); // pageBox 크기 참조

  const [rawPages, setRawPages] = useState([]);
  const [err, setErr] = useState(null);
  const [bookSize, setBookSize] = useState({ width: 600, height: 800 }); // 기본값

  // storyId 가져오기
  const { state, search } = useLocation();
  const qs = new URLSearchParams(search);
  const storyId = state?.storyId ?? qs.get("storyId");
  const storyData = state?.storyData;

  console.log("넘어온 동화 정보:", storyData);

  // axios 인스턴스
  const api = useMemo(
    () =>
      axios.create({
        baseURL: API_BASE,
        withCredentials: true,
        headers: { "ngrok-skip-browser-warning": "true" },
      }),
    []
  );

  /** pageBox 크기 → bookSize 갱신 */
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const box = containerRef.current.getBoundingClientRect();
        const width = box.width / 2; // 펼친 책의 절반 → 한쪽 페이지
        const height = box.height;
        setBookSize({ width, height });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  /** 최초 1페이지 로딩 */
  useEffect(() => {
    if (!storyId) {
      setErr("storyId가 없습니다.");
      return;
    }
    if (storyData) {
      const firstPage = toPage(storyData.data.data);
      setRawPages([firstPage]);
      return;
    }
  }, [storyId, storyData]);

  /** 선택지 클릭 → 다음 페이지 추가 */
  const handleChoiceClick = async (choiceText) => {
    try {
      const url = `/stories/${storyId}/pages`;
      const { data } = await api.post(url, { choice: choiceText });
      const nextPage = toPage(data);

      setRawPages((prev) => [...prev, nextPage]);
      flipBookRef.current?.pageFlip()?.flipNext();
    } catch (err) {
      console.error("선택지 전송 실패:", err);
      setErr("다음 페이지를 불러오지 못했습니다.");
    }
  };

  /** 페이지 렌더링 */
  const renderSpread = (page, idx) => [
    <div key={`image-${idx}`} className="IS_leftBox IS_page">
      {/* 
      {isImageUrlLike(page.image) ? (
        <img src={page.image} alt="" className="IS_illust" />
      ) : (
        <div className="IS_illustPlaceholder" />
      )}
      */}
    </div>,
    <div key={`text-${idx}`} className="IS_rightBox IS_page">
      <div className="IS_text_box">{page.text}</div>
      <div className="IS_select_box">
        {[page.select1, page.select2, page.select3, page.select4]
          .filter(Boolean)
          .map((label, i) => (
            <button
              key={`${idx}-sel-${i}`}
              className="IS_select"
              onClick={() => handleChoiceClick(label)}
            >
              {label}
            </button>
          ))}
      </div>
    </div>,
  ];

  const pagesToRender =
    rawPages.length > 0 ? rawPages.flatMap(renderSpread) : [];

  return (
    <div className="interactiveStory_page">
      <div className="IS_pageBox" ref={containerRef}>
        {err && <div className="IS_errorBanner">{err}</div>}

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

export default InteractiveStory;
