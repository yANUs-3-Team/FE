import { useRef, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import axios from "axios";
import "../component/Css/interactiveStory.css";
import DefaultModal from "../component/modal/defaultModal";

/** ===== 환경 상수 ===== */
const BACK_IP = process.env.REACT_APP_BACK_IP;
const API_BASE =
  process.env.NODE_ENV === "development" ? "/" : `https://${BACK_IP}`;

const AI_IP = process.env.REACT_APP_AI_IP;

const ORIGIN = `https://${AI_IP}`;

/** ===== 유틸 ===== */
const toPage = (p) => {
  const rawImg = p?.image ?? "";
  const image =
    typeof rawImg === "string" && !rawImg.startsWith("http")
      ? `${ORIGIN}${rawImg}` // 슬래시로 시작하면 ngrok 주소 붙임
      : rawImg;

  return {
    image,
    text: p?.story ?? "",
    select1: p?.choices_1 ?? p?.choice_1 ?? "",
    select2: p?.choices_2 ?? p?.choice_2 ?? "",
    select3: p?.choices_3 ?? p?.choice_3 ?? "",
    select4: p?.choices_4 ?? p?.choice_4 ?? "",
  };
};

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
  const containerRef = useRef(null); // pageBox 크기 참조

  const [rawPages, setRawPages] = useState([]);
  const [bookSize, setBookSize] = useState({ width: 600, height: 800 }); // 기본값

  // 🔹 모달 상태 추가
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

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
      setModalMsg("storyId가 없습니다.");
      setModalOpen(true);
      return;
    }
    if (storyData) {
      const firstPage = toPage(storyData.data);
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
      setModalMsg("다음 페이지를 불러오지 못했습니다.");
      setModalOpen(true);
    }
  };

  /** 페이지 렌더링 */
  const renderSpread = (page, idx) => {
    // ✅ 여기서 로그 찍기 (page 매개변수를 쓸 수 있음)
    console.log(`이미지 주소 [${idx}]:`, page.image);

    return [
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

      {/* 공용 모달 */}
      <DefaultModal
        isOpen={modalOpen}
        title="에러 발생"
        message={modalMsg}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

export default InteractiveStory;
