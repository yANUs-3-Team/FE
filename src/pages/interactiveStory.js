import { useRef, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import axios from "axios";
import "../component/Css/interactiveStory.css";
import DefaultModal from "../component/modal/defaultModal";
import LoadingModal from "../component/modal/loadingModal";

/** ===== 환경 상수 ===== */
const BACK_IP = process.env.REACT_APP_BACK_IP;
const API_BASE = `https://${BACK_IP}`;

const AI_IP = process.env.REACT_APP_AI_IP;
const ORIGIN = `https://${AI_IP}`;

/** ===== 유틸 ===== */
const toPage = (p) => {
  const rawImg = p?.image ?? "";
  const image =
    typeof rawImg === "string" && !rawImg.startsWith("http")
      ? `${ORIGIN}${rawImg}`
      : rawImg;

  return {
    image,
    text: p?.story ?? "",
    select1: p?.choices_1 ?? p?.choice_1 ?? "",
    select2: p?.choices_2 ?? p?.choice_2 ?? "",
    select3: p?.choices_3 ?? p?.choice_3 ?? "",
    select4: p?.choices_4 ?? p?.choice_4 ?? "",
    finish: p?.finish ?? false,
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
  const navigate = useNavigate();

  const flipBookRef = useRef(null);
  const containerRef = useRef(null); // pageBox 크기 참조

  const [rawPages, setRawPages] = useState([]);
  const [bookSize, setBookSize] = useState({ width: 600, height: 800 }); // 기본값

  const [sessionId, setSessionId] = useState(null);

  // 🔹 모달 상태 추가
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [loadingNext, setLoadingNext] = useState(false);

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

      // session_id 저장
      if (storyData.data.session_id) {
        setSessionId(storyData.data.session_id);
      }
      return;
    }
  }, [storyId, storyData]);

  /** 선택지 클릭 → 다음 페이지 추가 */
  const handleChoiceClick = async (choiceIndex) => {
    try {
      setLoadingNext(true); // 🔹 로딩 시작

      const payload = {
        choice: String(choiceIndex + 1),
        session_id: sessionId,
        storyId: storyId,
      };

      const token = localStorage.getItem("token");

      console.log("보내는 데이터:", payload);
      const { data } = await api.post(`/stories/${storyId}/pages`, payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      // 응답에서 다음 페이지 데이터 변환
      const pageData = data.data ?? data.page ?? data;
      const nextPage = toPage(pageData);

      console.log("선택지로 넘어온 동화 정보:", pageData);

      // 페이지 먼저 추가
      setRawPages((prev) => [...prev, nextPage]);

      // 잠깐 띄운 뒤 자동 넘기기
      setTimeout(() => {
        flipBookRef.current?.pageFlip()?.flipNext();
      }, 500); // 0.5초 정도 딜레이 (원하면 늘리기 가능)
    } catch (err) {
      console.error("선택지 전송 실패:", err);
      setModalMsg("다음 페이지를 불러오지 못했습니다.");
      setModalOpen(true);
    } finally {
      setLoadingNext(false); // 🔹 성공/실패 상관없이 로딩 종료
    }
  };

  /** 페이지 렌더링 */
  const renderSpread = (page, idx) => {
    return [
      <div key={`image-${idx}`} className="IS_leftBox IS_page">
        {isImageUrlLike(page.image) ? (
          <img src={page.image} alt="" className="IS_illust" />
        ) : (
          <div className="IS_illustPlaceholder" />
        )}
      </div>,
      <div key={`text-${idx}`} className="IS_rightBox IS_page">
        <div className="IS_rightGroup">
          <div className="IS_text_box">{page.text}</div>
          <div className="IS_select_box">
            {page.finish ? (
              // finish=true → 끝내기 버튼만 노출
              <button
                className="IS_select"
                onClick={() =>
                  navigate("/story-viewer", {
                    state: { from: "interactiveStory", storyId },
                  })
                }
              >
                끝내기
              </button>
            ) : (
              // 일반 선택지
              [page.select1, page.select2, page.select3, page.select4]
                .filter(Boolean)
                .map((label, i) => (
                  <button
                    key={`${idx}-sel-${i}`}
                    className="IS_select"
                    onClick={() => handleChoiceClick(i)}
                  >
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

      {/* 공용 모달 */}
      <DefaultModal
        isOpen={modalOpen}
        title="에러 발생"
        message={modalMsg}
        onClose={() => setModalOpen(false)}
      />

      <LoadingModal
        isOpen={loadingNext}
        title="생성 중..."
        message="이미지를 생성하고 있습니다. 잠시만 기다려 주세요."
      />
    </div>
  );
}

export default InteractiveStory;
