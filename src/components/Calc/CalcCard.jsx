import "../../styles/Calc/CalcCard.css";

function CalcCard() {
  return (
    <>
      <section className="card-wrap">
        <div className="card-top">
          <div className="card-status">
            <div className="card-color" />
          </div>
          <div className="card-title">
            <h2>2026년 새해벙 🎉</h2>
            <div className="close-button" title="삭제">
              ❌
            </div>
          </div>
        </div>

        <div className="card-middle">
          <div className="card-date">
            <p className="date-text">2026년 01월 01일(목) 오후 4시 50분</p>
          </div>
          <div className="card-place">
            <p>파주</p>
          </div>
        </div>

        <div className="card-bottom">
          <div className="card-owner">
            <p>벙주: 키텔</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default CalcCard;
