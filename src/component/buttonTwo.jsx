import '../component/Css/buttonTwo.css';

const ButtonTwo = ({ 선택지, onClick, disabled }) => {
  return (
    <div
      title="Button border purple"
      className="button btnFloat btnPurple gaegu-light"
      style={{ left: '3.3vw' }}
      data-content={선택지}
      onClick={onClick}
      aria-disabled={disabled}
    ></div>
  );
};

export default ButtonTwo;
