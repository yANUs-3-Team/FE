import Footer from "../component/footer";
import "../component/Css/community.css";

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
          <div className="commu_myContainer"></div>
          <div className="commu_mainBox">
            <div className="commu_topContainer"></div>
            <div className="commu_writeContainer"></div>
            <div className="commu_listContainer">
              <div className="commu_postContainer"></div>
              <div className="commu_postContainer"></div>
              <div className="commu_postContainer"></div>
              <div className="commu_postContainer"></div>
              <div className="commu_postContainer"></div>
              <div className="commu_postContainer"></div>
            </div>
            <div className="commu_bottomContainer"></div>
          </div>
          <div className="commu_bestContainer"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Community;