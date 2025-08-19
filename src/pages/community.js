import React, { useMemo, useState, useEffect, useCallback } from "react";
import Footer from "../component/footer";
import "../component/Css/community.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // (미사용이어도 요청대로 다른 부분은 건드리지 않음)

const BACK_IP = process.env.REACT_APP_BACK_IP;

// axios 인스턴스
const api = axios.create({
  baseURL: `https://${BACK_IP}`,
});
api.defaults.headers.common["ngrok-skip-browser-warning"] = "true";
api.defaults.withCredentials = true; // ★ 쿠키 기반 인증 활성화

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * 한국식 날짜 & 시간 문자열 표현
 */
const formatKoreanDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString("ko-KR", { hour12: false });
};

/*
*24시간 이내면 상대시간, 넘으면 YYYY-MM-DD HH:mm
*/
const formatRelativeOrDate = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";

  const diffMs = Date.now() - d.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "방금 전";
  if (diffMin < 60) return `${diffMin}분 전`;

  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}시간 전`;

  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
};


/**
 * 숫자 user_id 반환(동기): sessionStorage 캐시만 사용
 * - 마운트 시 useEffect에서 /users/me로 1회 프라임하여 sessionStorage.user_id 채움
 */
const getNumericUserId = () => {
  const s = sessionStorage.getItem("user_id");
  if (s != null && s !== "") {
    const n = Number(s);
    if (Number.isFinite(n)) return n;
  }
  return null;
};

function Community() {
  // 상태
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 20;

  const [isWriting, setIsWriting] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const [searchField, setSearchField] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");

  // 미디어 프리뷰(현재 전송 X)
  const [media, setMedia] = useState([]);

  const navigate = useNavigate();

  // ✅ 마운트 시 한번 /users/me 호출하여 user_id 프라임(세션 캐시)
  useEffect(() => {
    (async () => {
      try {
        const me = await api.get("/users/me"); // 쿠키 포함됨
        const raw =
          me?.data?.user?.user_id ??
          me?.data?.user_id ??
          me?.data?.id ??
          me?.data?.uid ??
          null;
        const n = Number(raw);
        if (Number.isFinite(n)) {
          sessionStorage.setItem("user_id", String(n));
        } else {
          sessionStorage.removeItem("user_id");
        }
      } catch {
        sessionStorage.removeItem("user_id");
      }
    })();
  }, []);

  // 목록 데이터 정규화
  const mapArticleToPost = (a) => {
    const id =
      a.article_id ?? a.id ?? a._id ?? a.articleId ?? String(Math.random());
    const author = a.user_id ?? a.author ?? a.username ?? "작성자";
    const createdIso =
      a.created_At ??
      a.createdAt ??
      a.created_at ??
      a.updated_At ??
      a.updatedAt ??
      a.updated_at ??
      null;

    return {
      id,
      title: a.title,
      author: String(author),
      date: formatRelativeOrDate(createdIso),
      content: a.content ?? "",
      raw: a,
    };
  };

  // GET /articles
  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await api.get("/articles");
      const list = Array.isArray(res.data) ? res.data : [];
      setPosts(list.map(mapArticleToPost));
    } catch (e) {
      console.error("fetchArticles error:", e?.message, e);
      setErrorMsg("게시글 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ POST /articles  → { user_id, title, content }
  const createArticle = async ({ title, content }) => {
    const user_id = getNumericUserId(); // 세션 캐시에서 동기 조회
    if (user_id == null) {
      throw new Error("NO_USER_ID");
    }
    const body = { user_id, title, content };
    console.debug("POST /articles body:", body);
    const res = await api.post("/articles", body, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  };

  // 최초 로드
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // 검색
  const handleSearch = () => setCurrentPage(1);
  const handleSearchKeyDown = (e) => e.key === "Enter" && handleSearch();

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return posts;

    const key =
      searchField === "author"
        ? "author"
        : searchField === "date"
        ? "date"
        : "title";

    return posts.filter((p) =>
      String(p[key] || "")
        .toLowerCase()
        .includes(q)
    );
  }, [posts, searchField, searchQuery]);

  // 페이지네이션
  const totalPages = Math.max(
    1,
    Math.ceil(filteredPosts.length / postsPerPage)
  );
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageClick = (pageNum) => setCurrentPage(pageNum);
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handleFirstPage = () => setCurrentPage(1);
  const handleLastPage = () => setCurrentPage(totalPages);

  const getVisiblePages = (total, current, max = 5) => {
    if (total <= max) return Array.from({ length: total }, (_, i) => i + 1);
    let start = Math.max(1, current - Math.floor(max / 2));
    let end = start + max - 1;
    if (end > total) {
      end = total;
      start = Math.max(1, end - max + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = useMemo(
    () => getVisiblePages(totalPages, currentPage, 5),
    [totalPages, currentPage]
  );

  // 글쓰기
  const toggleWriting = () => {
    setIsWriting(true);
    setNewTitle("");
    setNewContent("");
    setMedia([]);
  };

  const handleSavePost = async () => {
    if (newTitle.trim() === "" || newContent.trim() === "") {
      alert("제목과 내용을 입력하세요.");
      return;
    }
    try {
      await createArticle({
        title: newTitle.trim(),
        content: newContent.trim(),
      });
      await fetchArticles();
      setIsWriting(false);
      setCurrentPage(1);
      setMedia([]);
    } catch (e) {
      if (e?.message === "NO_USER_ID") {
        alert("로그인 정보가 없습니다. 다시 로그인해 주세요.");
      } else if (e?.response) {
        console.error(
          "createArticle error:",
          e.response.status,
          e.response.data
        );
        alert(`게시글 저장 실패 (${e.response.status})`);
      } else {
        console.error("createArticle error:", e);
        alert("게시글 저장 중 오류가 발생했습니다.");
      }
    }
  };

  // 파일 프리뷰
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const next = files
      .filter((f) => f.type.startsWith("image/") || f.type.startsWith("video/"))
      .map((f) => ({
        url: URL.createObjectURL(f),
        type: f.type.startsWith("image/") ? "image" : "video",
        name: f.name,
        file: f,
      }));
    setMedia((prev) => [...prev, ...next]);
    e.target.value = "";
  };

  const removeMedia = (url) => {
    setMedia((prev) => {
      const target = prev.find((m) => m.url === url);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((m) => m.url !== url);
    });
  };

  // 상세
  const handlePostClick = (post) => {
    navigate("/community-view", { state: post });
  };

  return (
    <>
      <div className="community_page">
        <div className="commuTitle_box">
          <div className="decoGreen_box">
            <div className="circleGreen1"></div>
            <div className="circleGreen2"></div>
            <div className="circleGreen3"></div>
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
                <option value="author">작성자</option>
                <option value="date">날짜</option>
              </select>

              <input
                className="commu_topInput"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="검색어를 입력하세요"
              />

              <div className="commu_topButton" onClick={handleSearch}>
                검색
              </div>
            </div>

            {/* 로딩/에러 */}
            {loading && (
              <div
                className="commu_postContainer first last"
                style={{ justifyContent: "center" }}
              >
                불러오는 중…
              </div>
            )}
            {errorMsg && (
              <div
                className="commu_postContainer first last"
                style={{ justifyContent: "center", color: "crimson" }}
              >
                {errorMsg}
              </div>
            )}

            {/* 글쓰기 */}
            {!loading && !errorMsg && !isWriting && (
              <div className="commu_writeContainer" onClick={toggleWriting}>
                <p>새 글을 작성해 주세요!</p>
                <FontAwesomeIcon icon={faPen} />
              </div>
            )}
            {!loading && !errorMsg && isWriting && (
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

                {/* 미디어 프리뷰 */}
                {media.length > 0 && (
                  <div className="commu_mediaPreview">
                    {media.map((m) => (
                      <div className="commu_mediaItem" key={m.url}>
                        {m.type === "image" ? (
                          <img src={m.url} alt={m.name} />
                        ) : (
                          <video src={m.url} controls />
                        )}
                        <button
                          className="commu_mediaRemove"
                          onClick={() => removeMedia(m.url)}
                          type="button"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="commu_writeBottom">
                  <input
                    id="fileUpload"
                    type="file"
                    style={{ display: "none" }}
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="fileUpload"
                    className="commu_writeFileButton"
                    role="button"
                  >
                    <FontAwesomeIcon icon={faPaperclip} />
                  </label>

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

            {/* 목록 */}
            {!loading && !errorMsg && (
              <div className="commu_listContainer">
                {currentPosts.length === 0 ? (
                  <div
                    className="commu_postContainer first last"
                    style={{ justifyContent: "center" }}
                  >
                    검색 결과가 없습니다.
                  </div>
                ) : (
                  currentPosts.map((post, index) => {
                    const isFirst = index === 0;
                    const isLast = index === currentPosts.length - 1;

                    return (
                      <React.Fragment key={post.id}>
                        <div
                          className={`commu_postContainer ${
                            isFirst ? "first" : ""
                          } ${isLast ? "last" : ""}`}
                        >
                          <div
                            className="commu_postTitleBox"
                            style={{ cursor: "pointer" }}
                            onClick={() => handlePostClick(post)}
                          >
                            <div className="commu_postTitle">{post.title}</div>
                            <span>|</span>
                            <span>{post.author}</span>
                          </div>

                          <div className="commu_postRight">
                            <div className="commu_postDate">{post.date}</div>
                          </div>
                        </div>

                        {index < currentPosts.length - 1 && (
                          <div className="commu_postContour"></div>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </div>
            )}

            {/* 페이지네이션 */}
            {!loading && !errorMsg && (
              <div className="commu_bottomContainer">
                <div className="commu_pagination">
                  <div className="commu_pageArrow" onClick={handleFirstPage}>
                    {"<<"}
                  </div>
                  <div className="commu_pageArrow" onClick={handlePrevPage}>
                    {"<"}
                  </div>
                  <div className="commu_pageNumberBox">
                    {visiblePages.map((num) => (
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
            )}
          </div>

          {/* 사이드 인기글 (샘플) */}
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