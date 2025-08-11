import "../component/Css/wholeGallery.css";
import Footer from "../component/footer";
import { useNavigate } from "react-router-dom";

function WholeGallery() {
    const navigate = useNavigate();
    return (
        <>
            <div className="wholeGallery_page">
                <div className="WG_topBox">
                    <div className="goTo_myGallery" onClick={() => navigate("/my-gallery")}>나의 갤러리</div>
                    <div className="goTo_openGallery" onClick={() => navigate("/open-gallery")}>공개 갤러리</div>
                </div>

                <div className="WG_bottomBox"></div>
            </div>
            <Footer />
        </>
    );
}

export default WholeGallery;