import "./App.css";
import DailyWeight from "./components/DailyWeight";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import { UserId } from "./contexts/UserId";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState(0);

  return (
    <div className="App">
      <UserId.Provider value={{ userId, setUserId }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="stat" element={<DailyWeight />} />
          <Route path="home" element={<Home />} />
          <Route path="reg" element={<Register />} />
          <Route path="logout" element={<Login />} />
        </Routes>
      </UserId.Provider>
    </div>
  );
}

export default App;
