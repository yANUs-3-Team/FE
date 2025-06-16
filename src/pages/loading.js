import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../component/Css/loading.css";
import charPen from "../images/character_pen.png";

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    // 3초 후 story-complete 페이지로 이동
    const timer = setTimeout(() => {
      navigate("/story-complete");
    }, 3000);

    return () => clearTimeout(timer); // cleanup
  }, [navigate]);

  return (
    <div className="loading_page">
      <div className="loading_container">
        <div className="loading_spinner">
          {[...Array(8)].map((_, i) => {
            const angle = i * 45 * (Math.PI / 180);
            const radius = 35;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            const colors = [
              "#4B2450",
              "#543358",
              "#6A4C6D",
              "#795F7C",
              "#987C9B",
              "#A895AA",
              "#C8C0C9",
              "#D3CED4",
            ];

            return (
              <div
                key={i}
                style={{
                  top: `${y}%`,
                  left: `${x}%`,
                  backgroundColor: colors[i],
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                }}
              />
            );
          })}
        </div>

        <div className="loading_textBox">
          <div className="loading_text">동화가 생성되고 있어요!</div>
          <div className="loading_text">잠시만 기다려 주세요.</div>
        </div>
      </div>
      <img src={charPen} alt="" className="charPen_img" />
    </div>
  );
}

export default Loading;
