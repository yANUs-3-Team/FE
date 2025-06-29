import { useState } from "react";
import Footer from "../component/footer";
import "../component/Css/openGallery.css";
import halfSide3 from "../images/character_halfSide3.png";

function OpenGallery() {
    const itemsPerPage = 9;
    const allCovers = Array.from({ length: 100 }, (_, idx) => ({
        id: idx + 1
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

    const author = "홍길동";

    return (
        <>
            <div className="openGallery_page">
                <div className="galleryTitle_box2">
                    <div className="decoSquare_box">
                        <div className="squarePuple1"></div>
                        <div className="squarePuple2"></div>
                        <div className="squarePuple3"></div>
                    </div>
                    <div className="openGallery_title">공개 갤러리</div>
                    <div className="OG_speechBubble">다른 사람들이 만든 작품을 함께 볼까요?</div>
                    <div className="galleryIcon_box2">
                        <img src={halfSide3} alt="" className="OGcharIMG" />
                    </div>
                </div>
                <div className="cover_container2">
                    {currentCovers.map((cover) => (
                        <div key={cover.id} className="cover_box2">
                            <button className="OG_detail_button">💡 저자: {author}</button>
                            <button className="OG_detail_button">📖 동화책 읽기</button>
                        </div>
                    ))}
                </div>

                <div className="OGpagination_container">
                    {currentGroup > 0 && (
                        <button
                            className="OGpagination_button"
                            onClick={() => handlePageChange(groupStart - 1)}
                        >
                            ◀
                        </button>
                    )}

                    {Array.from(
                        { length: groupEnd - groupStart + 1 },
                        (_, idx) => {
                            const pageNum = groupStart + idx;
                            return (
                                <button
                                    key={pageNum}
                                    className="OGpagination_button"
                                    onClick={() => handlePageChange(pageNum)}
                                >
                                    {pageNum}
                                </button>
                            );
                        }
                    )}

                    {groupEnd < totalPages && (
                        <button
                            className="OGpagination_button"
                            onClick={() => handlePageChange(groupEnd + 1)}
                        >
                            ▶
                        </button>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
}

export default OpenGallery;
