import { useState } from "react";
import Footer from "../component/footer";
import "../component/Css/myGallery.css";
import halfSide3 from "../images/character_halfSide3.png";
import halfSide2 from "../images/character_halfSide2.png";
import { useNavigate } from "react-router-dom";

function MyGallery() {
  const itemsPerPage = 9;
  const allCovers = Array.from({ length: 10 }, (_, idx) => ({
    id: idx + 1,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allCovers.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentCovers = allCovers.slice(startIdx, startIdx + itemsPerPage);

  const pagesPerGroup = 5;
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
  const groupStart = currentGroup * pagesPerGroup + 1;
  const groupEnd = Math.min(groupStart + pagesPerGroup - 1, totalPages);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="myGallery_page">
        <div className="galleryTitle_box">
          <div className="decoCircle_box">
            <div className="circleBlue1"></div>
            <div className="circleBlue2"></div>
            <div className="circleBlue3"></div>
          </div>
          <div className="myGallery_title">나의 동화책</div>
          {currentCovers.length > 0 && (
            <>
              <div className="MG_speechBubble">
                지금까지 만든 동화책을 확인해 보세요!
              </div>
              <div className="galleryIcon_box">
                <img src={halfSide3} alt="" className="MGcharIMG" />
              </div>
            </>
          )}
        </div>

        {currentCovers.length === 0 ? (
          <div className="emptyCover_container">
            <div className="emptyCover_box">
              <div className="emptySentence_T">아직 만든 동화가 없어요!</div>
              <div className="emptySentence_P">함께 동화를 만들어 볼까요?</div>
              <div
                className="emptyToCreate_button"
                onClick={() => navigate("/create")}
              >
                동화 만들러 가기
              </div>
            </div>
            <img src={halfSide2} alt="" className="MGcharEmptyIMG" />
          </div>
        ) : (
          <>
            <div className="cover_container">
              {currentCovers.map((cover) => (
                <div key={cover.id} className="cover_box">
                  <button className="MG_detail_button" onClick={() => navigate("/story-viewer")}>📖 동화책 읽기</button>
                  <button className="MG_detail_button" onClick={() => navigate("/story-viewer")}>✏️ 동화책 고치기</button>
                </div>
              ))}
            </div>

            <div className="MGpagination_container">
              <div className="MGpagination_wrapper">
                {currentGroup > 0 && (
                  <button
                    className="MGpagination_arrow left"
                    onClick={() => handlePageChange(groupStart - 1)}
                  >
                    ◀
                  </button>
                )}

                <div className="MGpagination_center">
                  {Array.from(
                    { length: groupEnd - groupStart + 1 },
                    (_, idx) => {
                      const pageNum = groupStart + idx;
                      return (
                        <button
                          key={pageNum}
                          className="MGpagination_button"
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                  )}
                </div>

                {groupEnd < totalPages && (
                  <button
                    className="MGpagination_arrow right"
                    onClick={() => handlePageChange(groupEnd + 1)}
                  >
                    ▶
                  </button>
                )}
              </div>
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
}

export default MyGallery;
