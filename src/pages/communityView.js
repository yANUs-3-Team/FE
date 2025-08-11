import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpRegular } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Footer from "../component/footer";
import "../component/Css/communityView.css";

function CommunityView() {
    const [comments, setComments] = useState([]);
    const [postLiked, setPostLiked] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const handleAddComment = () => {
        const trimmed = inputValue.trim();
        if (trimmed === "") return;

        const now = new Date();
        const formattedTime = now.toLocaleString(); // 🕒 시간 포맷: 예) 2025.8.11. 오전 10:25:43

        const newComment = {
            text: trimmed,
            id: Date.now(),
            liked: false,
            createdAt: formattedTime, // ✅ 현재 시간 저장
        };

        setComments(prev => [...prev, newComment]);
        setInputValue("");
    };

    const toggleCommentLike = (id) => {
        setComments(prev =>
            prev.map(comment =>
                comment.id === id ? { ...comment, liked: !comment.liked } : comment
            )
        );
    };

    return (
        <>
            <div className="commuView_page">
                <div className="commuView_postContainer">
                    <div className="commuView_topBox">
                        <div className="commuView_postProfile"></div>
                        <div className="commuView_postIdBox">
                            <div className="commuView_postId">아이디</div>
                            <div className="commuView_postDate">2025.08.11</div>
                        </div>
                    </div>
                    <div className="commuView_postTitle">게시글 제목</div>
                    <div className="commuView_postText">Incididunt dolore adipisicing duis labore nulla cupidatat.</div>
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleAddComment();
                        }}
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
                                        <div className="commuView_commentDate">{comment.createdAt}</div> {/* ⏰ 댓글 시간 표시 */}
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