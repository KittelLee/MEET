import { useState } from "react";
import Pencil from "../assets/icons/pencil.svg";
import CalcCard from "../components/Calc/CalcCard";
import CalcModal from "../components/Modal/CalcAddModal";
import ModalForm from "../common/Modal/ModalForm";
import "../styles/Calc.css";

function Calc() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <section className="calc-wrap">
        <div className="calc-top">
          <input type="text" placeholder="벙 이름으로 검색" />
          <button onClick={() => setIsModalOpen(true)}>
            <img src={Pencil} />
          </button>
        </div>

        <div className="calc-list">
          <CalcCard />
        </div>
      </section>
      <ModalForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CalcModal />
      </ModalForm>
    </>
  );
}

export default Calc;
