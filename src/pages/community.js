import Footer from "../component/footer";
import "../component/Css/community.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

function Community() {
  return (
    <>
      <div className="community_page">
        <div className="commuTitle_box">
          <div className="decoCircle_box">
            <div className="circleBlue1"></div>
            <div className="circleBlue2"></div>
            <div className="circleBlue3"></div>
          </div>
          <div className="commu_title">커뮤니티</div>
        </div>

        <div className="commu_wholeBox">
          <div className="commu_myContainer">
            <div className="commu_myButton">📝 내가 쓴 글</div>
            <div className="commu_myContour"></div>
            <div className="commu_myButton">💬 댓글 단 글</div>
            <div className="commu_myContour"></div>
            <div className="commu_myButton">❤️ 좋아요한 글</div>
          </div>

          <div className="commu_mainBox">
            <div className="commu_topContainer">
              <div className="commu_topText">검색 결과</div>
              <select className="commu_topSelect">
                <option value="title">제목</option>
                <option value="author">작가</option>
                <option value="date">날짜</option>
              </select>
              <input className="commu_topInput" />
              <div className="commu_topButton">검색</div>
            </div>

            <div className="commu_writeContainer">
              <p>새 글을 작성해 주세요!</p>
              <FontAwesomeIcon icon={faPen} />
            </div>

            <div className="commu_listContainer">
              <div className="commu_postContainer">
                <div className="commu_postTitle">제목</div>
                <div className="commu_postDate">mm분 전</div>
              </div>
              <div className="commu_postContour"></div>
              <div className="commu_postContainer">
                <div className="commu_postTitle">제목</div>
                <div className="commu_postDate">mm분 전</div>
              </div>
              <div className="commu_postContour"></div>
              <div className="commu_postContainer">
                <div className="commu_postTitle">제목</div>
                <div className="commu_postDate">mm분 전</div>
              </div>
              <div className="commu_postContour"></div>
              <div className="commu_postContainer">
                <div className="commu_postTitle">제목</div>
                <div className="commu_postDate">mm분 전</div>
              </div>
              <div className="commu_postContour"></div>
              <div className="commu_postContainer">
                <div className="commu_postTitle">제목</div>
                <div className="commu_postDate">mm분 전</div>
              </div>
              <div className="commu_postContour"></div>
              <div className="commu_postContainer">
                <div className="commu_postTitle">제목</div>
                <div className="commu_postDate">mm분 전</div>
              </div>
              <div className="commu_postContour"></div>
              <div className="commu_postContainer">
                <div className="commu_postTitle">제목</div>
                <div className="commu_postDate">mm분 전</div>
              </div>
            </div>

            <div className="commu_bottomContainer"></div>
          </div>

          <div className="commu_bestContainer">
            <div className="commu_bestTitle">🔥 인기 게시물</div>
            <div className="commu_bestContour"></div>
            <div className="commu_bestPostBox">
              <div className="commu_bestPost">인기 게시글 1</div>
              <div className="commu_bestContour"></div>
              <div className="commu_bestPost">인기 게시글 2</div>
              <div className="commu_bestContour"></div>
              <div className="commu_bestPost">인기 게시글 3</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Community;