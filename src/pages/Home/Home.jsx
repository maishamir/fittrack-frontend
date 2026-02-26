import React, { useState, useEffect } from "react";
import { getRoutines, startSession } from "../../api/routines";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Flame, TrendingUp, Calendar, CheckCircle2 } from "lucide-react";
import "./Home.scss";
import StatCard from "../../components/StatCard/StatCard";

function Home() {
  const [routines, setRoutines] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRoutines() {
      const data = await getRoutines();
      setRoutines(data);
    }

    fetchRoutines();
  }, []);

  async function handleStart(routineId) {
    try {
      setLoadingId(routineId);
      const session = await startSession(routineId);

      const sessionId = session.id ?? session.session.Id;
      navigate(`/workout/${sessionId}`);
    } finally {
      setLoadingId(null);
    }
  }
  return (
    <div className="home">
      <Header />

      <div className="home__stats">
        <StatCard icon={<Flame color="#FF8904"/>} text={"streak"} cardContent={"1"} />
        <StatCard icon={<TrendingUp color="#51A2FF"/>} text={"total"} cardContent={"1"} />
        <StatCard icon={<Calendar color="#C27AFF"/>} text={"today"} cardContent={<CheckCircle2 width={20} height={20}/>} />
      </div>

      <h2>Your Routines</h2>
      {routines.map((routine) => (
        <div
          key={routine.id}
          style={{ display: "flex", gap: 12, alignItems: "center" }}
        >
          <div>{routine.name}</div>
          <button
            onClick={() => handleStart(routine.id)}
            disabled={loadingId == routine.id}
          >
            {loadingId === routine.id ? "Starting..." : "Play"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
