import room1 from "../assets/imgs/room1.jpeg";
import room2 from "../assets/imgs/room2.jpeg";
import "../styles/Room.css";

function Room() {
  return (
    <>
      <section className="room-wrap">
        <p>원하는 방 이미지 혹은 텍스트 클릭 후 이동</p>
        <div className="room-top">
          <div className="room-info">
            <a href="https://open.kakao.com/o/gg5k4nWh">
              <img src={room1} />
              <p>1반 링크</p>
            </a>
          </div>

          <div className="room-info">
            <a href="https://open.kakao.com/o/gqAcPF1h">
              <img src={room2} />
              <p>2반 링크</p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Room;
