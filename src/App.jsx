import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Workout from "./pages/Workout/Workout";
import Calendar from "./pages/Calendar/Calendar";
import Header from "./components/Layout/Header/Header";
import toast, {Toaster} from 'react-hot-toast'

import "./App.scss";
import Routines from "./pages/Routines/Routines";
import CreateRoutine from "./pages/CreateRoutine/CreateRoutine";
import EditRoutine from "./pages/EditRoutine/EditRoutine";

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
          <Route path="/routines/createRoutine" element={<CreateRoutine/> } />

          <Route path="/routines/:routineId/edit" element={<EditRoutine />}/>


        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
