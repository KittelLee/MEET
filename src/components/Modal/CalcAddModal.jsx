import { useState, useEffect } from "react";
import "../../styles/Modal/CalcAddModal.css";

function CalcAddModal() {
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

  const [bank, setBank] = useState("카카오페이");
  const isKakaoPay = bank === "카카오페이";

  const [account, setAccount] = useState("");
  const [startAt, setStartAt] = useState("");

  useEffect(() => {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    const formatted = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate()
    )}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

    setStartAt(formatted);
  }, []);

  useEffect(() => {
    if (isKakaoPay) setAccount("");
  }, [isKakaoPay]);

  return (
    <form className="calcAddModal-wrap">
      <h2>정산시트 만들기</h2>
      <div className="form-field">
        <label>벙 제목</label>
        <input type="text" placeholder="벙 제목을 입력하세요" required />
      </div>

      <div className="form-field">
        <label>벙주</label>
        <input type="text" placeholder="벙주를 입력하세요" required />
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
          required
          value={startAt}
          onChange={(e) => setStartAt(e.target.value)}
        />
      </div>

      <div className="form-field">
        <label>벙 장소</label>
        <input type="text" placeholder="지역만 알 수 있게 입력하세요" />
      </div>

      <div className="form-field">
        <label>비밀번호 (4자리 숫자)</label>
        <input
          type="password"
          pattern="\d{4}"
          maxLength={4}
          placeholder="0000"
          required
        />
      </div>

      <div className="form-button">
        <button>완료</button>
      </div>
    </form>
  );
}

export default CalcAddModal;
