import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Footer from "../component/footer";
import "../component/Css/communityView.css";
import { useLocation } from 'react-router-dom';

function CommunityView() {
  const [comments, setComments] = useState([]);
  const [postLiked, setPostLiked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const location = useLocation();
  const post = location.state;

  if (!post) {
    return <div className="commuView_page">잘못된 접근입니다.</div>;
  }

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

    setComments(prev => [...prev, newComment]);
    setInputValue("");
  };

  const toggleCommentLike = (id) => {
    setComments(prev =>
      prev.map(c => (c.id === id ? { ...c, liked: !c.liked } : c))
    );
  };

  return (
    <>
      <div className="commuView_page">
        <div className="commuView_postContainer">
          <div className="commuView_topBox">
            <div className="commuView_postProfile"></div>
            <div className="commuView_postIdBox">
              <div className="commuView_postId">익명</div>
              <div className="commuView_postDate">{post.date}</div>
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
                  <div className="commuView_commentProfile"></div>
                  <div className="commuView_commentIdBox">
                    <div className="commuView_commentId">아이디</div>
                    <div className="commuView_commentDate">{comment.createdAt}</div>
                  </div>
                </div>
                {comment.text}
                <div className="commuView_statusBar">
                  <div className="commuView_postLikeBox">
                    <div className="commuView_postLike">
                      <FontAwesomeIcon
                        icon={comment.liked ? faThumbsUpSolid : faThumbsUpRegular}
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