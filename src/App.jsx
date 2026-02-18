import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home";
import Workout from "./pages/Workout/Workout";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workout/:sessionId" element={<Workout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
