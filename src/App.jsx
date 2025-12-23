import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rule from "./pages/Rule";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 500);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <div>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rule" element={<Rule />} />
          </Routes>

          <Footer />
        </div>
      ) : (
        <div className="desktop-message">
          📢 모바일 환경에서만 볼 수 있습니다.
        </div>
      )}
    </>
  );
}

export default App;
