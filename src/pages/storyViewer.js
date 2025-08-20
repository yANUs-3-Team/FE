import { useRef, useState, useEffect, useMemo } from "react";
import axios from "axios";
import HTMLFlipBook from "react-pageflip";
import "../component/Css/storyViewer.css";
import { useNavigate, useLocation } from "react-router-dom";

const BACK_IP = process.env.REACT_APP_BACK_IP;
const API_BASE = `https://${BACK_IP}`;

const AI_IP = process.env.REACT_APP_AI_IP;
const ORIGIN = `https://${AI_IP}`;

function StoryViewer() {
  const navigate = useNavigate();
  const location = useLocation();

  const flipBookRef = useRef(null);
  const containerRef = useRef(null);

  const [bookSize] = useState({ width: 600, height: 800 });
  const [rawPages, setRawPages] = useState([]);
  const [storyTitle, setStoryTitle] = useState("");

  const storyId = location.state?.storyId;

  const api = useMemo(
    () =>
      axios.create({
        baseURL: API_BASE,
        withCredentials: true,
        headers: { "ngrok-skip-browser-warning": "true" },
      }),
    []
  );

  useEffect(() => {
    if (!storyId) return;

    const fetchStory = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get(`/stories/${storyId}/pages`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        console.log("동화 내용 페이지 조회 성공:", res.data);

        const data = res.data.data;

        // ✅ 제목 세팅
        setStoryTitle(data.title || "제목 없는 동화");

        // ✅ 페이지 배열인지 확인 후 처리
        if (Array.isArray(data.pages)) {
          const sortedPages = [...data.pages].sort(
            (a, b) => a.page_number - b.page_number
          );

          setRawPages(
            sortedPages.map((p) => ({
              image: p.img_url
                ? `${ORIGIN}${p.img_url}` // 절대 경로로 변환
                : null,
              text: p.content,
            }))
          );
        } else {
          console.warn("페이지 데이터가 배열이 아님:", data.pages);
        }
      } catch (err) {
        console.error("스토리 로딩 실패:", err);
      }
    };

    fetchStory();
  }, [storyId, api]);

  const renderSpread = (page, idx) => [
    <div key={`image-${idx}`} className="SV_leftBox SV_page">
      <img src={page.image} alt="" className="SV_illust" />
    </div>,
    <div key={`text-${idx}`} className="SV_rightBox SV_page">
      <div className="SV_rightGroup">
        <div className="SV_text_box">{page.text}</div>
      </div>
    </div>,
  ];

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
          style={{ width: "100%", height: "100%" }}
        >
          {pagesToRender}
        </HTMLFlipBook>
      </div>

      <div
        className="SV_exit_button"
        onClick={() => {
          const from = location.state?.from;
          if (from === "interactiveStory") navigate("/");
          else if (from === "myGallery") navigate("/my-gallery");
          else if (from === "openGallery") navigate("/open-gallery");
          else navigate("/");
        }}
      >
        ⬅ 나가기
      </div>
    </div>
  );
}

export default StoryViewer;
