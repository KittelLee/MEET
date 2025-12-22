import { useEffect } from "react";
import { Link } from "react-router-dom";
import town from "../assets/imgs/town.png";
import kakaoLogo from "../assets/icons/kakaotalk.svg";
import "../styles/Home.css";

function Home() {
  useEffect(() => {
    const bubbles = document.querySelectorAll(".bubble-left, .bubble-right");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.remove("hidden");
          } else {
            entry.target.classList.add("hidden");
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.5 }
    );

    bubbles.forEach((bubble) => observer.observe(bubble));

    return () => {
      bubbles.forEach((bubble) => observer.unobserve(bubble));
    };
  }, []);
  return (
    <>
      <section className="section-first">
        <div className="text-box">
          <strong>
            🐣수도권2030🐣 서울경기
            <br />
            💖김포, 강서, 강남, 수원, 용인 등💖
            <br />
            수도권에서 만나요!
          </strong>
          <p>
            지금 바로 카카오톡 오픈채팅방에 수도권2030 서울경기를 검색하고
            소통해보세요.
          </p>
        </div>
        <div className="kakao-btn-box">
          <Link to="./room" className="kakao-btn">
            <img src={kakaoLogo} alt="카카오톡로고" />
            카카오톡으로 이동하기
          </Link>
        </div>
        <div className="town">
          <img src={town} alt="동네이미지" />
        </div>
      </section>

      <section className="section-second">
        <div className="title-text">
          <h1>🎉환영합니다🎉</h1>
          <h2>순서대로 해볼까요!</h2>
          <div className="bubble-wrap">
            <div className="bubble-left">
              <p>
                1. 하트인증 ♥️
                <br />
                &#40;하트 누르고 캡처인증&#41;
                <br />
                <br />
                우측 상단 짝대기 3개 클릭!
                <br />
                커버보기
                <br />
                중단 우측에 하트 ♥️
              </p>
            </div>
            <div className="bubble-right">
              <p>
                2. 닉변 👤
                <br />
                <br />
                ex&#41; 선도 97 분당 여 0102
                <br />
                &#40;닉 연도 지역 성별 오늘날짜&#41;
              </p>
            </div>
            <div className="bubble-left">
              <p>
                3. 얼공 😃
                <br />
                <br />
                입장 후 얼공 필수!! 😉
                <br />
                &#40; 눈,코,입 나온걸로 전신불가🚫 &#41;
                <br />
                얼공한장하고 이성지목 1명가능! 😏
                <br />
                지목당한사람도 얼공!! 😮
                <br />
                (방장,부방 확인 후 가리기 적용, 자삭금지!)
              </p>
            </div>
            <div className="bubble-right">
              <p>
                4. 자기소개서 작성 ❣️
                <br />
                <br />
                공지에 자기소개서 작성 부탁해!
                <br />
                <br />
              </p>
              <span id="align-left">
                유입경로(검색어) :<br />
                직업 :<br />
                이상형 : <br />
                MBTI :<br />
                주량 :<br />
                흡연 :<br />
                취미 :<br />내 성격 :
              </span>
            </div>
            <div className="bubble-left">
              <p>5. 공지 읽고 댓글 부탁해 ✅</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
