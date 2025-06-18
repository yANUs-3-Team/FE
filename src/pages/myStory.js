import Footer from "../component/footer";
import "../component/Css/myStory.css";
import halfSide3 from "../images/character_halfSide3.png";

function MyStory() {
    return (
        <>
            <div className="myStory_page">
                <div className="decoCircle_box">
                    <div className="circleBlue1"></div>
                    <div className="circleBlue2"></div>
                    <div className="circleBlue3"></div>
                </div>
                <div className="myStory_title">나의 동화책</div>
                <div className="storyIcon_box">
                    <img src={halfSide3} alt="" className="MScharIMG"></img>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MyStory;