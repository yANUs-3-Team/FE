import "../Css/defaultModal.css";

function defaultModal({ isOpen, title, message, onClose, actions }) {
  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        {title && <div className="modalTitle">{title}</div>}
        <div className="modalMessage">{message}</div>

        <div className="modalActions">
          {actions && actions.length > 0 ? (
            actions.map((action, idx) => (
              <button
                key={idx}
                className="modalButton"
                onClick={action.onClick}
                style={{ backgroundColor: action.color || "#ff8f8f" }}
              >
                {action.label}
              </button>
            ))
          ) : (
            <button className="modalButton" onClick={onClose}>
              확인
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default defaultModal;
