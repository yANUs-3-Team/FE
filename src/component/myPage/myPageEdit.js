import "../Css/myPageEdit.css";
import profile from "../../images/default_profile.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function MyPageEdit({ userInfo, setUserInfo, isUnder14, onDone }) {
  const [form, setForm] = useState({ ...userInfo });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("userInfo", JSON.stringify(form));
    setUserInfo(form);
    onDone();
  };

  return (
    <div className="edit_box">
      <div className="edit_topBox">
        <img src={profile} alt="" className="edit_profile" />
        <div className="tag_buttonBox">
          <div className="edit_profileEdit">
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>

          <div className="edit_save" onClick={handleSave}>
            <FontAwesomeIcon icon={faCheck} />
          </div>
        </div>
      </div>

      <div className="edit_bottomBox">
        <div className="edit_leftBox">
          <div className="edit_infoBox">
            <label className="edit_label" htmlFor="name">
              이름
            </label>
            <input
              className="edit_input"
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange}
            />
          </div>

          <div className="edit_infoBox">
            <label className="edit_label" htmlFor="email">
              이메일
            </label>
            <input
              className="edit_input"
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="edit_infoBox">
            <label className="edit_label" htmlFor="birth">
              생년월일
            </label>
            <input
              className="edit_input"
              id="birth"
              type="date"
              value={form.birth}
              onChange={handleChange}
            />
          </div>

          {isUnder14 && (
            <div className="edit_infoBox">
              <label className="edit_label" htmlFor="parentName">
                보호자 이름
              </label>
              <input
                className="edit_input"
                id="parentName"
                type="text"
                value={form.parentName}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        <div className="edit_rightBox">
          <div className="edit_infoBox">
            <label className="edit_label" htmlFor="username">
              아이디
            </label>
            <input
              className="edit_input_id"
              id="username"
              type="text"
              value={form.username}
              onChange={handleChange}
            />
            <div className="edit_idCheck_button">중복 확인</div>
          </div>

          <div className="edit_infoBox">
            <label className="edit_label" htmlFor="password">
              비밀번호
            </label>
            <input
              className="edit_input"
              id="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <div className="edit_infoBox">
            <label className="edit_label" htmlFor="passwordConfirm">
              비밀번호 확인
            </label>
            <input
              className="edit_input"
              id="passwordConfirm"
              type="password"
              value={form.passwordConfirm}
              onChange={handleChange}
            />
          </div>

          {isUnder14 && (
            <div className="edit_infoBox">
              <label className="edit_label" htmlFor="parentPhone">
                보호자 연락처
              </label>
              <input
                className="edit_input"
                id="parentPhone"
                type="tel"
                value={form.parentPhone}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPageEdit;
