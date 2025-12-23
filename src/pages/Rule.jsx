import Rule1 from "../assets/imgs/rule1.jpeg";
import Rule2 from "../assets/imgs/rule2.jpeg";
import "../styles/Rule.css";

function Rule() {
  return (
    <>
      <section className="rule-wrap">
        <div className="rule-box">
          <img src={Rule1} />
        </div>
        <div className="rule-box">
          <img src={Rule2} />
        </div>
      </section>
    </>
  );
}

export default Rule;
