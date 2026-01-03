import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import "../../styles/Calc/CalcCard.css";

dayjs.locale("ko");

function formatKoreanDateTime(startAt) {
  const d = startAt?.toDate ? dayjs(startAt.toDate()) : dayjs(startAt);
  return (
    `${d.year()}년 ${d.month() + 1}월 ${d.date()}일 (` +
    `${["일", "월", "화", "수", "목", "금", "토"][d.day()]}) ` +
    d.format("A h:mm")
  );
}

function getStatus(startAt, nowMs, durationDays = 2) {
  const startDate = startAt?.toDate ? startAt.toDate() : new Date(startAt);
  const endMs = dayjs(startDate)
    .startOf("day")
    .add(durationDays, "day")
    .valueOf();

  return nowMs >= endMs ? "ended" : "active";
}

function CalcCard({ sheet, onDelete, nowMs }) {
  const status = getStatus(sheet.startAt, nowMs, 2);

  return (
    <>
      <section className="card-wrap">
        <div className="card-top">
          <div className="card-status">
            <div className={`card-color card-color--${status}`} />
          </div>
          <div className="card-title">
            <h2>{sheet.title}</h2>
            <div
              className="close-button"
              title="삭제"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(sheet.id);
              }}
            >
              ❌
            </div>
          </div>
        </div>

        <div className="card-middle">
          <div className="card-date">
            <p className="date-text">{formatKoreanDateTime(sheet.startAt)}</p>
          </div>
          <div className="card-place">
            <p>{sheet.place}</p>
          </div>
        </div>

        <div className="card-bottom">
          <div className="card-owner">
            <p>벙주: {sheet.owner}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default CalcCard;

CalcCard.propTypes = {
  nowMs: PropTypes.number.isRequired,
  sheet: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    bank: PropTypes.string.isRequired,
    account: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    startAt: PropTypes.any.isRequired,
    place: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
