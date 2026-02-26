import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Workout from "./pages/Workout/Workout";
import Header from "./components/Header/Header";
import "./App.scss";

function App() {
  return (
    <div className="app">
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout/:sessionId" element={<Workout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
