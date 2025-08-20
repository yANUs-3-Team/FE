import { useState } from "react";
import Footer from "../component/footer";
import "../component/Css/create.css";
import halfSide2 from "../images/character_halfSide2.png";
import starIcon from "../images/star_icon.png";
import leftButton from "../images/leftButton.png";
import rightButton from "../images/rightButton.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import NameInputPage from "../component/create/nameInputPage";
import PersonalitySelectPage from "../component/create/personalitySelectPage";
import CharacteristicsPage from "../component/create/characteristicsInputPage";
import LocationSelectPage from "../component/create/locationSelectPage";
import EraSelectPage from "../component/create/eraSelectPage";
import GenreSelectPage from "../component/create/genreSelectPage";
import SummaryPage from "../component/create/summaryPage";

// AI -> Back 서버 axios 인스턴스
const BACK_IP = process.env.REACT_APP_BACK_IP;
const api = axios.create({
  baseURL: `https://${BACK_IP}`,
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

function Create() {
  const [pageIndex, setPageIndex] = useState(0);
  const [name, setName] = useState("");
  const [personality, setPersonality] = useState("");
  const [characteristics, setCharacteristics] = useState("");
  const [location, setLocation] = useState("");
  const [era, setEra] = useState("");
  const [genre, setGenre] = useState("");
  const [visibility, setVisibility] = useState("private"); // UI용
  const [endingpoint, setEndingpoint] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const menuList = [
    "주인공의 이름",
    "주인공의 성격",
    "주인공의 특징",
    "시작 장소",
    "시대",
    "장르",
  ];

  const menuList2_1 = [
    "주인공의",
    "주인공의",
    "주인공의",
    "이야기가 진행될",
    "이야기의 배경이 될",
    "이야기의",
    "이렇게 동화를 만들까요?",
  ];

  const menuList2_2 = ["이름", "성격", "특징", "장소", "시대", "장르", ""];
  const menuList2_3 = [
    "을 정해 주세요!",
    "을 정해 주세요!",
    "을 선택해 주세요!",
    "를 선택해 주세요!",
    "를 선택해 주세요!",
    "를 선택해 주세요!",
    "",
  ];

  const handleNext = () => {
    if (pageIndex < 6) setPageIndex((p) => p + 1);
  };
  const handlePrev = () => {
    if (pageIndex > 0) setPageIndex((p) => p - 1);
  };

  const handleRandomName = () => {
    const names = ["아린", "도윤", "세라", "진우", "유나", "하린"];
    setName(names[Math.floor(Math.random() * names.length)]);
  };

  const pages = [
    <NameInputPage
      name={name}
      setName={setName}
      handleRandomName={handleRandomName}
    />,
    <PersonalitySelectPage
      personality={personality}
      setPersonality={setPersonality}
    />,
    <CharacteristicsPage
      characteristics={characteristics}
      setCharacteristics={setCharacteristics}
    />,
    <LocationSelectPage location={location} setLocation={setLocation} />,
    <EraSelectPage era={era} setEra={setEra} />,
    <GenreSelectPage genre={genre} setGenre={setGenre} />,
    <SummaryPage
      name={name}
      personality={personality}
      endingpoint={endingpoint}
      setEndingpoint={setEndingpoint}
      characteristics={characteristics}
      location={location}
      era={era}
      genre={genre}
      visibility={visibility}
      setVisibility={setVisibility}
      setPageIndex={setPageIndex}
      navigate={navigate}
    />,
  ];

  /**
   * 전송 성공(2xx)이면 곧장 /loading 으로 이동
   * */
  const handleStorySubmit = async () => {
    if (submitting) return;


    const n = parseInt(endingpoint, 10);
    if (!Number.isInteger(n) || n < 1) {
      alert("엔딩페이지 수를 1 이상의 정수로 입력해 주세요.");
      return;
    }

    const payload = {
      name,
      personality,
      characteristics,
      location,
      era,
      genre,
      ending_point: n,
    };

    console.log("Payload being sent:", payload);
    

    try {
      setSubmitting(true);

      const token = localStorage.getItem("token");

      const res = await api.post("/stories", payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      // 응답 형태에 storyId가 있으면 함께 넘기고, 없어도 로딩으로 이동해 대기
      const storyId =
        res.data?.storyId ?? // 혹시 백에서 바뀔 수도 있으니 남겨둠
        res.data?.id ??
        res.data?.data?.story_id ??
        null;

      console.log("백에서 받은 storyId:", storyId, res.data);

      navigate("/loading", {
        state: {
          storyId,
          storyData: res.data, 
          request: payload, // 로딩에서 디버깅/표시용으로 쓸 수 있음
        },
        replace: true, // 뒤로가기 시 중복 제출 방지
      });
    } catch (err) {
      console.error("동화 생성 요청 실패:", err);
      alert(
        "동화 생성 요청을 전송하지 못했습니다. 잠시 후 다시 시도해 주세요."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const isEndingpointValid =
    Number.isInteger(parseInt(endingpoint, 10)) &&
    parseInt(endingpoint, 10) >= 1;

  return (
    <>
      <div className="create_page">
        <div className="create_box">
          <img src={starIcon} alt="star" className="starImg" />
          <div className="spring_box">
            {[...Array(7)].map((_, i) => (
              <div key={`spring-${i}`} className="spring" />
            ))}
          </div>

          <div className="sketch">
            <div className="sketch_menuContainer">
              <img src={halfSide2} alt="Sketch" className="sketch_char" />
              <div className="sketch_menuBox">
                {menuList.map((text, i) => (
                  <div
                    key={`menu-${i}`}
                    className={`sketch_menu ${
                      i === pageIndex && pageIndex !== 6 ? "selected" : ""
                    }`}
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="create_container">
              <div className="create_title">
                <div className="create_titleText">{menuList2_1[pageIndex]}</div>
                <div className="create_titleSubtext">
                  {menuList2_2[pageIndex]}
                </div>
                <div className="create_titleText">{menuList2_3[pageIndex]}</div>
              </div>

              <div className="create_contentBox">{pages[pageIndex]}</div>

              <div className="pagination_box">
                {pageIndex === 6 ? (
                  <>
                    <div
                      className="pagination_button left_button"
                      onClick={() => setPageIndex(0)}
                    >
                      설정 바꾸기
                    </div>
                    <div
                      className="pagination_button right_button"
                      onClick={handleStorySubmit}
                      disabled={!isEndingpointValid || submitting}
                    >
                      동화 만들기
                    </div>
                  </>
                ) : (
                  <>
                    {pageIndex === 0 ? (
                      <div style={{ width: "4.6875vw" }} />
                    ) : (
                      <img
                        src={leftButton}
                        alt=""
                        className="leftButton_img"
                        onClick={handlePrev}
                      />
                    )}
                    <img
                      src={rightButton}
                      alt=""
                      className="rightButton_img"
                      onClick={handleNext}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Create;
