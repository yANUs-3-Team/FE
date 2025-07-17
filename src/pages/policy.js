import "../component/Css/policy.css";
import { useEffect, useState } from "react";

function Policy() {
  const [privacyText, setPrivacyText] = useState("");
  const [termsText, setTermsText] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState("privacy"); // 초기값은 개인정보처리방침

  useEffect(() => {
    fetch("/privacy.txt")
      .then((res) => res.text())
      .then((text) => setPrivacyText(text));

    fetch("/terms.txt")
      .then((res) => res.text())
      .then((text) => setTermsText(text));
  }, []);

  return (
    <div className="policy_page">
      <div className="policy_container">
        <div className="policy_title">
          {selectedPolicy === "privacy"
            ? "[ 개인정보 수집 · 이용 동의서 ]"
            : "[ 이용약관 ]"}
        </div>

        <div className="policy_paragraphs_box">
          {selectedPolicy === "privacy" ? privacyText : termsText}
        </div>
      </div>

      <div className="policy_bookmark_box">
        <div
          className={`policy_bookmark ${selectedPolicy === "privacy" ? "active" : ""}`}
          onClick={() => setSelectedPolicy("privacy")}
        >
          개인정보처리방침
        </div>
        <div
          className={`policy_bookmark ${selectedPolicy === "terms" ? "active" : ""}`}
          onClick={() => setSelectedPolicy("terms")}
        >
          이용약관
        </div>
      </div>
    </div>
  );
}

export default Policy;
