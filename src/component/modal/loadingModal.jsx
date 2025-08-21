import "../Css/loadingModal.css";

function LoadingModal({
  isOpen,
  title = "처리 중...",
  message = "잠시만 기다려 주세요.",
}) {
  if (!isOpen) return null;

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
      className="LM_modalOverlay"
      role="dialog"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="LM_modalContainer">
        <div className="LM_modalActions">
          <div className="LM_spinnerRing">
            {[...Array(8)].map((_, i) => {
              const angle = i * 45 * (Math.PI / 180);
              const radius = 25;
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              return (
                <div
                  key={i}
                  className="LM_spinnerDot"
                  style={{
                    top: `${y}%`,
                    left: `${x}%`,
                    backgroundColor: colors[i],
                    // pulse 타이밍을 계단식으로 주기 위한 delay 변수
                    ["--delay"]: `${i * -0.1}s`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {title && <div className="LM_modalTitle">{title}</div>}
        {message && <div className="LM_modalMessage">{message}</div>}
      </div>
    </div>
  );
}

export default LoadingModal;
