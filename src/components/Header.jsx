import { useState } from "react";
import { Link } from "react-router-dom";
import bars from "../assets/icons/bars.svg";
import "../styles/Header.css";

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = () => {
    setIsNavOpen(false);
  };
  return (
    <header className="header">
      <div className="header-wrap">
        <div className="logo-box">
          <Link to="/" className="logo">
            <p>🐣수도권2030🐣 서울경기 💖우리들의 놀이💖</p>
          </Link>
        </div>
        <nav className={`navbar ${isNavOpen ? "active" : ""}`}>
          <ul className="nav">
            <li>
              <Link to="/rule" onClick={handleLinkClick}>
                모임회칙
              </Link>
            </li>
            <li>
              <Link to="/room" onClick={handleLinkClick}>
                방이동
              </Link>
            </li>
            <li>
              <Link to="/calc" onClick={handleLinkClick}>
                정산하기
              </Link>
            </li>
            <li>
              <Link to="/out" onClick={handleLinkClick}>
                외출신청
              </Link>
            </li>
            <li>
              <Link to="/suggestion" onClick={handleLinkClick}>
                익명 건의함
              </Link>
            </li>
          </ul>
        </nav>
        <button className="toggle-btn" onClick={toggleNav}>
          <img src={bars} alt="메뉴바" />
        </button>
      </div>
    </header>
  );
}

export default Header;
