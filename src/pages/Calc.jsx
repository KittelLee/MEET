import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { toast } from "react-toastify";
import Pencil from "../assets/icons/pencil.svg";
import CalcCard from "../components/Calc/CalcCard";
import CalcModal from "../components/Modal/CalcAddModal";
import ModalForm from "../common/Modal/ModalForm";
import "../styles/Calc.css";

function Calc({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sheets, setSheets] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [nowMs, setNowMs] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "calcSheets"), orderBy("startAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setSheets(list);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNowMs(Date.now()), 60 * 1000);
    return () => clearInterval(t);
  }, []);

  const addSheet = useCallback(async (payload) => {
    await addDoc(collection(db, "calcSheets"), {
      title: payload.title,
      owner: payload.owner,
      bank: payload.bank,
      account: payload.account,
      startAt: Timestamp.fromDate(new Date(payload.startAt)),
      place: payload.place,
      password: payload.password,
    });
    setIsModalOpen(false);
  }, []);

  const deleteSheet = useCallback(async (id) => {
    if (!window.confirm("정말 삭제할까요?")) return;
    await deleteDoc(doc(db, "calcSheets", id));
    toast.success("삭제되었습니다.");
  }, []);

  const enterSheet = (sheet) => {
    const pw = window.prompt("비밀번호 4자리를 입력하세요");
    if (!pw) return;

    if (pw === sheet.password) {
      navigate(`/calcMain/${sheet.id}`, { state: sheet });
    } else {
      toast.error("비밀번호가 일치하지 않습니다.");
    }
  };

  const visibleSheets = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return sheets;
    return sheets.filter((s) => (s.title ?? "").toLowerCase().includes(k));
  }, [sheets, keyword]);

  return (
    <>
      <section className="calc-wrap">
        <div className="calc-top">
          <input
            type="text"
            placeholder="벙 이름으로 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="button" onClick={() => setIsModalOpen(true)}>
            <img src={Pencil} alt="추가" />
          </button>
        </div>

        <div className="calc-list">
          {visibleSheets.map((sheet) => (
            <div
              key={sheet.id}
              onClick={() => enterSheet(sheet)}
              style={{ cursor: "pointer" }}
            >
              <CalcCard sheet={sheet} nowMs={nowMs} onDelete={deleteSheet} />
            </div>
          ))}
        </div>
      </section>

      <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CalcModal user={user} onSubmit={addSheet} />
      </ModalForm>
    </>
  );
}

export default Calc;

Calc.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    email: PropTypes.string,
    displayName: PropTypes.string,
  }),
};
