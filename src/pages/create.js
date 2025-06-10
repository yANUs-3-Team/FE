import Footer from "../component/footer";
import "../component/Css/create.css";
import halfSide2 from "../images/character_halfSide2.png";

function Create() {
    return (
        <>
            <div className="create_page">
                <div className="create_box">
                    <div className="spring_box">
                        <div className="spring"></div>
                        <div className="spring"></div>
                        <div className="spring"></div>
                        <div className="spring"></div>
                        <div className="spring"></div>
                        <div className="spring"></div>
                    </div>
                    <div className="sketch">
                        <div className="sketch_menuContainer">
                            <img src={halfSide2} alt="Sketch" className="sketch_char" />
                            <div className="sketch_menuBox">
                                <div className="sketch_menu">주인공의 이름</div>
                                <div className="sketch_menu">주인공의 성격</div>
                                <div className="sketch_menu">주인공의 특징</div>
                                <div className="sketch_menu">시작 장소</div>
                                <div className="sketch_menu">시대</div>
                                <div className="sketch_menu">장르</div>
                            </div>
                        </div>
                        
                        <div className="create_container">
                            <div className="create_title">
                                <div className="create_titleText">주인공의</div>
                                <div className="create_titleSubtext">이름</div>
                                <div className="create_titleText">을 정해주세요!</div>
                            </div>
                            <div className="create_contentBox">
                                <div className="select_box">
                                    <div className="input_container">비워둬도 괜찮아요!</div>
                                    <div className="random_button">랜덤!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Create;