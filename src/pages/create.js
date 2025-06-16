import { useState } from "react";
import Footer from "../component/footer";
import "../component/Css/create.css";
import halfSide2 from "../images/character_halfSide2.png";
import starIcon from "../images/star_icon.png";
import { useNavigate } from "react-router-dom";

function Create() {
  const [pageIndex, setPageIndex] = useState(0);
  const [name, setName] = useState("");
  const [personality, setPersonality] = useState("");
  const [characteristics, setCharacteristics] = useState("");
  const [location, setLocation] = useState("");
  const [era, setEra] = useState("");
  const [genre, setGenre] = useState("");
  const [visibility, setVisibility] = useState("private");
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
    if (pageIndex < 6) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  };

  const randomNames = ["아린", "도윤", "세라", "진우", "유나", "하린"];
  const handleRandomName = () => {
    const randomIndex = Math.floor(Math.random() * randomNames.length);
    setName(randomNames[randomIndex]);
  };

  return (
    <>
      <div className="create_page">
        <div className="create_box">
          <img src={starIcon} alt="star" className="starImg" />
          <div className="spring_box">
            {[...Array(7)].map((_, i) => (
              <div key={`spring-${i}`} className="spring"></div>
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

              <div className="create_contentBox">
                {(() => {
                  switch (pageIndex) {
                    case 0:
                      return (
                        <div className="select_box">
                          <div className="select_container">
                            <input
                              type="text"
                              name="name"
                              className="input_container"
                              placeholder="이름을 입력해 주세요!"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            <div
                              className="random_button"
                              onClick={handleRandomName}
                            >
                              랜덤!
                            </div>
                          </div>
                        </div>
                      );
                    case 1:
                      return (
                        <div className="select_box">
                          <div className="select_container">
                            <div className="select_button">다정한</div>
                            <div className="select_button">친절한</div>
                            <div className="select_button">까칠한</div>
                            <div className="select_button">엄격한</div>
                          </div>
                          <div className="select_container">
                            <div className="select_button">느긋한</div>
                            <div className="select_button">호기심 많은</div>
                            <div className="select_button">상관 없어요!</div>
                          </div>
                          <div className="select_container">
                            <input
                              type="text"
                              className="input_container"
                              placeholder="직접 입력해 주세요!"
                              value={personality}
                              onChange={(e) => setPersonality(e.target.value)}
                            />
                          </div>
                        </div>
                      );
                    case 2:
                      return (
                        <div className="select_box">
                          <div
                            className="select_container"
                            style={{ flexDirection: "column", gap: "1vh" }}
                          >
                            <textarea
                              className="textarea_container"
                              value={characteristics}
                              onChange={(e) =>
                                setCharacteristics(e.target.value)
                              }
                              placeholder="" // placeholder를 빈 값으로 설정
                            />
                            <div className="placeholder_fallback">
                              직접 입력해 주세요! <br />
                              예) 단발의 붉은 머리카락. 여자. 인간
                            </div>
                          </div>
                        </div>
                      );
                    case 3:
                      return (
                        <div className="select_box">
                          <div className="select_container">
                            <div className="select_button">숲속</div>
                            <div className="select_button">도시</div>
                            <div className="select_button">바다</div>
                            <div className="select_button">마을</div>
                          </div>
                          <div className="select_container">
                            <div className="select_button">학교</div>
                            <div className="select_button">집</div>
                            <div className="select_button">상관 없어요!</div>
                          </div>
                          <div className="select_container">
                            <input
                              type="text"
                              className="input_container"
                              placeholder="직접 입력해 주세요!"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                            />
                          </div>
                        </div>
                      );
                    case 4:
                      return (
                        <div className="select_box">
                          <div className="select_container">
                            <div className="select_button">고대</div>
                            <div className="select_button">중세</div>
                            <div className="select_button">현대</div>
                            <div className="select_button">미래</div>
                          </div>
                          <div className="select_container">
                            <div className="select_button">원시</div>
                            <div className="select_button">신화</div>
                            <div className="select_button">상관 없어요!</div>
                          </div>
                          <div className="select_container">
                            <input
                              type="text"
                              className="input_container"
                              placeholder="직접 입력해 주세요!"
                              value={era}
                              onChange={(e) => setEra(e.target.value)}
                            />
                          </div>
                        </div>
                      );
                    case 5:
                      return (
                        <div className="select_box">
                          <div className="select_container">
                            <div className="select_button">판타지</div>
                            <div className="select_button">마법</div>
                            <div className="select_button">우화</div>
                            <div className="select_button">미스터리</div>
                          </div>
                          <div className="select_container">
                            <div className="select_button">고전</div>
                            <div className="select_button">자연</div>
                            <div className="select_button">상관 없어요!</div>
                          </div>
                          <div className="select_container">
                            <input
                              type="text"
                              className="input_container"
                              placeholder="직접 입력해 주세요!"
                              value={genre}
                              onChange={(e) => setGenre(e.target.value)}
                            />
                          </div>
                        </div>
                      );
                    case 6:
                      return (
                        <div className="select_box2">
                          <div className="select_container2">
                            <div className="selected_group">
                              <div className="selected_label">
                                주인공의 이름
                              </div>
                              <div className="selected_value">
                                {name || "선택되지 않음"}
                              </div>
                            </div>
                            <div className="selected_group">
                              <div className="selected_label">
                                주인공의 성격
                              </div>
                              <div className="selected_value">
                                {personality || "선택되지 않음"}
                              </div>
                            </div>
                          </div>
                          <div className="select_container2">
                            <div className="selected_group">
                              <div className="selected_label">
                                주인공의 특징
                              </div>
                              <div className="selected_value2">
                                {characteristics || "선택되지 않음"}
                              </div>
                            </div>
                          </div>
                          <div className="select_container2">
                            <div className="selected_group">
                              <div className="selected_label">시작 장소</div>
                              <div className="selected_value">
                                {location || "선택되지 않음"}
                              </div>
                            </div>
                            <div className="selected_group">
                              <div className="selected_label">시대</div>
                              <div className="selected_value">
                                {era || "선택되지 않음"}
                              </div>
                            </div>
                            <div className="selected_group">
                              <div className="selected_label">장르</div>
                              <div className="selected_value">
                                {genre || "선택되지 않음"}
                              </div>
                            </div>
                          </div>
                          <div className="select_container">
                            <label className="radio_label">
                              <input
                                type="radio"
                                name="visibility"
                                value="private"
                                checked={visibility === "private"}
                                onChange={(e) => setVisibility(e.target.value)}
                              />
                              나만 보기
                            </label>
                            <label className="radio_label">
                              <input
                                type="radio"
                                name="visibility"
                                value="public"
                                checked={visibility === "public"}
                                onChange={(e) => setVisibility(e.target.value)}
                              />
                              전체 공개
                            </label>
                          </div>
                        </div>
                      );
                    default:
                      return (
                        <div className="select_box">잘못된 페이지입니다.</div>
                      );
                  }
                })()}
              </div>

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
                      onClick={() => navigate("/loading")}
                    >
                      동화 만들기
                    </div>
                  </>
                ) : (
                  <>
                    {pageIndex === 0 ? (
                      <div style={{ width: "4.6875vw" }} />
                    ) : (
                      <div className="svg_button left" onClick={handlePrev}>
                        <svg viewBox="0 0 24 24">
                          <path
                            d="M15 18L9 12L15 6"
                            stroke="#4A3F55"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="svg_button right" onClick={handleNext}>
                      <svg viewBox="0 0 24 24">
                        <path
                          d="M9 6L15 12L9 18"
                          stroke="#4A3F55"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </div>
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
