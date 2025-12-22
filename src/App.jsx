import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rule from "./pages/Rule";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rule" element={<Rule />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
