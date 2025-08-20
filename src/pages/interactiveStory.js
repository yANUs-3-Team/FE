import { useRef, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import axios from "axios";
import "../component/Css/interactiveStory.css";

/** ===== 환경 상수 ===== */
const BACK_IP = process.env.REACT_APP_BACK_IP;
const API_BASE =
  process.env.NODE_ENV === "development" ? "/" : `https://${BACK_IP}`;
// 이미지 등 정적 자원은 절대 경로로(개발/배포 동일) 보정
const ORIGIN = `https://${BACK_IP}`;

/** ===== 유틸 ===== */
const toPage = (p) => ({
  image:
    typeof p?.image === "string" && p.image.startsWith("/")
      ? `${ORIGIN}${p.image}`
      : p?.image ?? "",
  text: p?.story ?? "",
  select1: p?.choices_1 ?? "",
  select2: p?.choices_2 ?? "",
  select3: p?.choices_3 ?? "",
  select4: p?.choices_4 ?? "",
});

const isImageUrlLike = (v) =>
  typeof v === "string" &&
  (v.startsWith("http") ||
    v.startsWith("/") ||
    v.startsWith("blob:") ||
    v.startsWith("data:") ||
    /\.(png|jpe?g|gif|webp|svg)$/i.test(v));

/** ===== 컴포넌트 ===== */
function InteractiveStory() {
  const flipBookRef = useRef(null);

  const [rawPages, setRawPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // storyId: navigate state 우선, 없으면 ?storyId=
  const { state, search } = useLocation();
  const qs = new URLSearchParams(search);

  // Create.js → navigate에서 보낸 값
  const storyId = state?.storyId ?? qs.get("storyId");
  const request = state?.request;
  const storyData = state?.storyData;

  console.log("넘어온 설정값:", request);

  // axios 인스턴스 (안정화)
  const api = useMemo(
    () =>
      axios.create({
        baseURL: API_BASE,
        withCredentials: true,
        headers: { "ngrok-skip-browser-warning": "true" },
      }),
    []
  );

  // 최초 1페이지 로딩
  useEffect(() => {
    if (!storyId) {
      setErr("storyId가 없습니다.");
      return;
    }

    if (storyData) {
      const firstPage = toPage(storyData);
      setRawPages([firstPage]);
      return;
    }

    // request fallback은 아예 제거하거나,
    // storyData 없을 때만 안전하게 사용
  }, [storyId, storyData]); // ✅ request 제거

  /** 선택지 클릭 → 다음 페이지 붙이기(추가 예정 자리) */
  const handleChoiceClick = async (choiceText) => {
    try {
      const url = `/stories/${storyId}/pages`;
      const { data } = await api.post(url, { choice: choiceText });

      // BE 응답: { story: "...", image: "...", choices_1: "...", ... }
      const nextPage = toPage(data);

      setRawPages((prev) => [...prev, nextPage]);
      flipBookRef.current?.pageFlip()?.flipNext();
    } catch (err) {
      console.error("선택지 전송 실패:", err);
      setErr("다음 페이지를 불러오지 못했습니다.");
    }
  };

  /** 퍼블리싱 동일 레이아웃 유지: 항상 "왼쪽/오른쪽" 형태로 렌더 */
  const renderSpread = (page, idx) => [
    <div key={`image-${idx}`} className="IS_leftBox IS_page">
      {isImageUrlLike(page.image) ? (
        <img src={page.image} alt="" className="IS_illust" />
      ) : (
        <div className="IS_illustPlaceholder" />
      )}
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

  /** 스켈레톤 스프레드(로딩/에러/빈값일 때도 동일 레이아웃 유지) */
  const renderSkeletonSpread = () => [
    <div key="skel-image" className="IS_leftBox IS_page">
      <div className="IS_skel IS_skel-illust" />
    </div>,
    <div key="skel-text" className="IS_rightBox IS_page">
      <div className="IS_skel IS_skel-text" />
      <div className="IS_select_box">
        <div className="IS_skel IS_skel-btn" />
        <div className="IS_skel IS_skel-btn" />
        <div className="IS_skel IS_skel-btn" />
        <div className="IS_skel IS_skel-btn" />
      </div>
    </div>,
  ];

  const pagesToRender =
    rawPages.length > 0
      ? rawPages.flatMap(renderSpread)
      : renderSkeletonSpread();

  return (
    <div className="interactiveStory_page">
      {/* 에러는 책 밖 배너로만 표시 → 퍼블리싱 구조 보존 */}
      {err && <div className="IS_errorBanner">{err}</div>}

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
        {pagesToRender}
      </HTMLFlipBook>
    </div>
  );
}

export default InteractiveStory;
