import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import "../../styles/Modal/CalcAddModal.css";

function CalcAddModal({ user, onSubmit }) {
  const now = dayjs().format("YYYY-MM-DDTHH:mm");

  const banks = [
    "국민은행",
    "신한은행",
    "농협은행",
    "기업은행",
    "우리은행",
    "하나은행",
    "산업은행",
    "씨티은행",
    "케이뱅크",
    "토스뱅크",
    "카카오뱅크",
    "카카오페이",
  ];

  const [title, setTitle] = useState("");
  const [owner, setOwner] = useState(user?.displayName ?? "");
  const [bank, setBank] = useState("카카오페이");
  const [account, setAccount] = useState("");
  const [startAt, setStartAt] = useState(now);
  const [place, setPlace] = useState("");
  const [password, setPassword] = useState("");

  const isKakaoPay = bank === "카카오페이";

  useEffect(() => {
    if (isKakaoPay) setAccount("");
  }, [isKakaoPay]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !owner.trim() ||
      !startAt ||
      !place.trim() ||
      !/^\d{4}$/.test(password) ||
      (!isKakaoPay && !account.trim())
    ) {
      toast.error("모든 입력란을 빠짐없이 작성해주세요!");
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        owner: owner.trim(),
        bank,
        account: isKakaoPay ? null : account.trim(),
        startAt,
        place: place.trim(),
        password,
      });

      toast.success("정산시트가 성공적으로 생성되었습니다!");
    } catch (err) {
      console.error(err);
      toast.error("생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <form className="calcAddModal-wrap" onSubmit={handleSubmit}>
      <h2>정산시트 만들기</h2>
      <div className="form-field">
        <label>벙 제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="벙 제목을 입력하세요"
          required
        />
      </div>

      <div className="form-field">
        <label>벙주</label>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          placeholder="벙주를 입력하세요"
          required
        />
      </div>

      <div className="form-field">
        <label>벙주 계좌</label>
        <select value={bank} onChange={(e) => setBank(e.target.value)}>
          {banks.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          disabled={isKakaoPay}
          placeholder={
            isKakaoPay ? "카카오페이는 계좌가 필요 없어요" : "계좌입력"
          }
          className={isKakaoPay ? "account-input--disabled" : ""}
        />
      </div>

      <div className="form-field">
        <label>벙 시작 시간</label>
        <input
          type="datetime-local"
          value={startAt}
          onChange={(e) => setStartAt(e.target.value)}
          required
        />
      </div>

      <div className="form-field">
        <label>벙 장소</label>
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="지역만 알 수 있게 입력하세요"
          required
        />
      </div>

      <div className="form-field">
        <label>비밀번호 (4자리 숫자)</label>
        <input
          type="password"
          pattern="\d{4}"
          maxLength={4}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="0000"
          required
        />
      </div>

      <div className="form-button">
        <button type="submit">완료</button>
      </div>
    </form>
  );
}

export default CalcAddModal;

CalcAddModal.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.object,
};
