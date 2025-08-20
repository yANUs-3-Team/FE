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
  select1: p?.choices_1 ?? p?.choice_1 ?? "",
  select2: p?.choices_2 ?? p?.choice_2 ?? "",
  select3: p?.choices_3 ?? p?.choice_3 ?? "",
  select4: p?.choices_4 ?? p?.choice_4 ?? "",
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
  const [err, setErr] = useState(null);

  // storyId: navigate state 우선, 없으면 ?storyId= 로 대체
  const { state, search } = useLocation();
  const qs = new URLSearchParams(search);

  const storyId = state?.storyId ?? qs.get("storyId");
  const storyData = state?.storyData; // ✅ Loading → navigate에서 전달받음

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

  /** 최초 1페이지 로딩 */
  useEffect(() => {
    if (!storyId) {
      setErr("storyId가 없습니다.");
      return;
    }

    if (storyData) {
      // ✅ storyData.data 안에 진짜 페이지 내용이 있음
      const firstPage = toPage(storyData.data ?? storyData);
      setRawPages([firstPage]);
      return;
    }
  }, [storyId, storyData]);

  /** 선택지 클릭 → 다음 페이지 붙이기 */
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

  /** 한 쌍(좌: 이미지, 우: 텍스트+선택지) 렌더 */
  const renderSpread = (page, idx) => [
    // 🔽 왼쪽 페이지(이미지) → 임시로 비워둠
    <div key={`image-${idx}`} className="IS_leftBox IS_page">
      {/* 
    {isImageUrlLike(page.image) ? (
      <img src={page.image} alt="" className="IS_illust" />
    ) : (
      <div className="IS_illustPlaceholder" />
    )} 
    */}
    </div>,

    // 🔽 오른쪽 페이지(텍스트 + 선택지)
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

  /** 스켈레톤 스프레드 */
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
