import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Workout from "./pages/Workout/Workout";
import Calendar from "./pages/Calendar/Calendar";
import Header from "./components/Layout/Header/Header";

import "./App.scss";

function App() {
  return (
    <div className="app">
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout/:sessionId" element={<Workout />} />
          <Route path="/calendar" element={<Calendar />} />

          {/* New routes */}
          <Route path="/routines" element={<Routines />} />
          <Route path="/routines/createRoutine" element={<Routines page={"create"}/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
