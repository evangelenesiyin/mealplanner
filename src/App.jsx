import { Link, Route, Routes } from "react-router-dom";
import Fridge from "./components/Fridge/Fridge";
import "./App.css"

function LandingPage() {
  return (
    <>
      <h1>What's in your fridge?</h1>
      <h3>Your handy application to track ingredients and plan meals</h3>
      <div className="fridge-container">
        <Link to={`/fridge`} style={{ display: "flex", justifyContent: "center" }}>
          <img className="closed-fridge" src="./assets/fridge-closed.png" />
        </Link>
        <Link to={`/fridge`} style={{ display: "flex", justifyContent: "center" }}>
          <img className="open-fridge" src="./assets/fridge-open.png" />
        </Link>
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/fridge" element={<Fridge />} />
    </Routes>
  );
}

export default App;