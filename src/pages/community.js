import React, { useMemo, useState } from "react";
import Footer from "../component/footer";
import "../component/Css/community.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Community() {
  const [posts, setPosts] = useState(
    Array.from({ length: 1 }, (_, i) => ({
      id: i + 1,
      title: `게시글 제목 ${i + 1}`,
      author: "작가 아이디",
      content: `이건 내용 ${i + 1}`,
      date: `${i + 1}분 전`,
    }))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

  const [isWriting, setIsWriting] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const [searchField, setSearchField] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");
  const [applyToken, setApplyToken] = useState(0);

  const handleSearch = () => {
    setApplyToken((t) => t + 1);
    setCurrentPage(1);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return posts;

    const fieldMap = {
      title: "title",
      author: "author",
      date: "date",
    };
    const key = fieldMap[searchField] || "title";

    return posts.filter((p) => String(p[key] || "").toLowerCase().includes(q));
  }, [posts, applyToken]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageClick = (pageNum) => setCurrentPage(pageNum);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);

  const toggleWriting = () => {
    setIsWriting(true);
    setNewTitle("");
    setNewContent("");
  };

  const handleSavePost = () => {
    if (newTitle.trim() === "" || newContent.trim() === "") return;

    const newPost = {
      id: posts.length + 1,
      title: newTitle.trim(),
      author: "작가 아이디",
      content: newContent.trim(),
      date: "방금 전",
    };

    setPosts([newPost, ...posts]);
    setIsWriting(false);
    setCurrentPage(1);
  };

  const navigate = useNavigate();
  const handlePostClick = (post) => {
    navigate("/community-view", { state: post });
  };

  return (
    <>
      <div className="community_page">
        <div className="commuTitle_box">
          <div className="decoPurple_box">
            <div className="circlePurple1"></div>
            <div className="circlePurple2"></div>
            <div className="circlePurple3"></div>
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

              <select
                className="commu_topSelect"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
              >
                <option value="title">제목</option>
                <option value="author">작가</option>
                <option value="date">날짜</option>
              </select>

              <input
                className="commu_topInput"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="검색어를 입력하세요"
              />

              <div className="commu_topButton" onClick={handleSearch}>
                검색
              </div>
            </div>

            {!isWriting ? (
              <div className="commu_writeContainer" onClick={toggleWriting}>
                <p>새 글을 작성해 주세요!</p>
                <FontAwesomeIcon icon={faPen} />
              </div>
            ) : (
              <div className="commu_writingContainer">
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="commu_writeTitle"
                />
                <textarea
                  placeholder="내용을 입력하세요"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="commu_writeBody"
                />
                <div className="commu_writeBottom">
                  <div className="commu_writeFileButton" onClick={handleSavePost}>
                    <FontAwesomeIcon icon={faPaperclip} />
                  </div>
                  <div
                    className={`commu_writeSaveButton ${
                      newTitle.trim() && newContent.trim() ? "active" : ""
                    }`}
                    onClick={handleSavePost}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </div>
                </div>
              </div>
            )}

            <div className="commu_listContainer">
              {currentPosts.length === 0 ? (
                <div className="commu_postContainer" style={{ justifyContent: "center" }}>
                  검색 결과가 없습니다.
                </div>
              ) : (
                currentPosts.map((post, index) => {
                  const isFirst = index === 0;
                  const isLast = index === currentPosts.length - 1;

                  return (
                    <React.Fragment key={post.id}>
                      <div
                        className={`commu_postContainer
                          ${isFirst ? "first" : ""}
                          ${isLast ? "last" : ""}`}
                        onClick={() => handlePostClick(post)}
                      >
                        <div className="commu_postTitleBox">
                          <div className="commu_postTitle">{post.title}</div>
                          <span>|</span>
                          <span>{post.author}</span>
                        </div>
                        <div className="commu_postDate">{post.date}</div>
                      </div>

                      {index < currentPosts.length - 1 && (
                        <div className="commu_postContour"></div>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </div>

            <div className="commu_bottomContainer">
              <div className="commu_pagination">
                <div className="commu_pageArrow" onClick={handleFirstPage}>
                  {"<<"}
                </div>
                <div className="commu_pageArrow" onClick={handlePrevPage}>
                  {"<"}
                </div>
                <div className="commu_pageNumberBox">
                  {pageNumbers.map((num) => (
                    <div
                      key={num}
                      className={`commu_pageNumber ${
                        currentPage === num ? "active" : ""
                      }`}
                      onClick={() => handlePageClick(num)}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                <div className="commu_pageArrow" onClick={handleNextPage}>
                  {">"}
                </div>
                <div className="commu_pageArrow" onClick={handleLastPage}>
                  {">>"}
                </div>
              </div>
            </div>
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