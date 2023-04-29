import "./App.css";
import DailyWeight from "./components/DailyWeight";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="stat" element={<DailyWeight />} />
        <Route path="home" element={<Home />} />
        <Route path="reg" element={<Register />} />
        <Route path="logout" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
