import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp as faThumbsUpSolid } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import profile from "../images/default_profile.png";
import Footer from "../component/footer";
import "../component/Css/communityView.css";
import { useLocation } from "react-router-dom";

const toKoreanDate = (isoLike) => {
  if (!isoLike) return "";
  const d = new Date(isoLike);
  return isNaN(d) ? "" : d.toLocaleString("ko-KR", { hour12: false });
};

function CommunityView() {
  const [comments, setComments] = useState([]);
  const [postLiked, setPostLiked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const location = useLocation();
  const post = location.state;

  if (!post) {
    return <div className="commuView_page">잘못된 접근입니다.</div>;
  }

  // author 우선, 없으면 username, 그것도 없으면 user_id(숫자/문자열) 사용
  const authorName =
    post.author ??
    post.username ??
    post.user_name ??
    (post.name != null ? String(post.name) : null) ??
    "익명";
  // 정규화된 post.date 우선, 없으면 원시 타임스탬프 후보에서 변환
  const dateStr =
    post.date ??
    toKoreanDate(
      post.created_At ||
        post.createdAt ||
        post.created_at ||
        post.updated_At ||
        post.updatedAt ||
        post.updated_at
    );

  const handleAddComment = () => {
    const trimmed = inputValue.trim();
    if (trimmed === "") return;

    const now = new Date();
    const formattedTime = now.toLocaleString();

    const newComment = {
      text: trimmed,
      id: Date.now(),
      liked: false,
      createdAt: formattedTime,
    };

    setComments((prev) => [...prev, newComment]);
    setInputValue("");
  };

  const toggleCommentLike = (id) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, liked: !c.liked } : c))
    );
  };

  return (
    <>
      <div className="commuView_page">
        <div className="commuView_postContainer">
          <div className="commuView_topBox">
            <img src={profile} alt="" className="commuView_postProfile" />
            <div className="commuView_postIdBox">
              <div className="commuView_postId">{authorName}</div>
              <div className="commuView_postDate">{dateStr}</div>
            </div>
          </div>

          <div className="commuView_postTitle">{post.title}</div>
          <div className="commuView_postText">{post.content}</div>

          {/* ✅ 미디어가 있으면 본문 아래에 표시 */}
          {post.media?.length > 0 && (
            <div className="commuView_mediaGrid">
              {post.media.map((m, idx) => (
                <div className="commuView_mediaItem" key={m.url ?? idx}>
                  {m.type === "image" ? (
                    <img src={m.url} alt={m.name || `image-${idx}`} />
                  ) : (
                    <video src={m.url} controls />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="commuView_statusBar">
            <div className="commuView_postLikeBox">
              <div className="commuView_postLike">
                <FontAwesomeIcon
                  icon={postLiked ? faThumbsUpSolid : faThumbsUpRegular}
                  onClick={() => setPostLiked(!postLiked)}
                  className="commuView_likeIcon"
                />
              </div>
              <p>{postLiked ? 1 : 0}</p>
            </div>
            <div className="commuView_postCommentBox">
              <div className="commuView_postcomment">
                <FontAwesomeIcon icon={faComment} />
              </div>
              <p>{comments.length}</p>
            </div>
          </div>
        </div>

        <div className="commuView_commentWritingBox">
          <input
            type="text"
            placeholder="댓글을 입력해 주세요."
            className="commuView_commentContainer"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
          />
          <div className="commuView_commentSave" onClick={handleAddComment}>
            <FontAwesomeIcon icon={faPen} />
          </div>
        </div>

        <div className="commuView_commentListContainer">
          {comments.length === 0 ? (
            <div className="commuView_noComment">댓글이 없습니다.</div>
          ) : (
            comments.map((comment) => (
              <div className="commuView_commentBox" key={comment.id}>
                <div className="commuView_commentTopBox">
                  <img
                    src={profile}
                    alt=""
                    className="commuView_commentProfile"
                  />
                  <div className="commuView_commentIdBox">
                    <div className="commuView_commentId">아이디</div>
                    <div className="commuView_commentDate">
                      {comment.createdAt}
                    </div>
                  </div>
                </div>
                {comment.text}
                <div className="commuView_statusBar">
                  <div className="commuView_postLikeBox">
                    <div className="commuView_postLike">
                      <FontAwesomeIcon
                        icon={
                          comment.liked ? faThumbsUpSolid : faThumbsUpRegular
                        }
                        onClick={() => toggleCommentLike(comment.id)}
                        className="commuView_likeIcon"
                      />
                    </div>
                    <p>{comment.liked ? 1 : 0}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CommunityView;
