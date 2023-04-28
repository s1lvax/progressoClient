import "./App.css";
import DailyWeight from "./components/DailyWeight";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="stat" element={<DailyWeight />} />
      </Routes>
    </div>
  );
}

export default App;
