import React, { useState, useEffect } from "react";
import { getRoutines, startSession } from "../../api/routines";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { Flame, TrendingUp, Calendar, CheckCircle2 } from "lucide-react";
import "./Home.scss";
import StatCard from "../../components/StatCard/StatCard";
import Message from "../../components/Message/Message";
import ScheduledCard from "../../components/Scheduled/Scheduled";
import RoutineCard from "../../components/RoutineCard/RoutineCard";

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
        <StatCard icon={<Flame color="#FF8904" />} text={"streak"} cardContent={"0"} />
        <StatCard icon={<TrendingUp color="#51A2FF" />} text={"total"} cardContent={"0"} />
        <StatCard icon={<Calendar color="#C27AFF" />} text={"today"} cardContent={"—"} />
        {/* <StatCard icon={<Calendar color="#C27AFF"/>} text={"today"} cardContent={<CheckCircle2 width={20} height={20}/>} /> */}
      </div>

      <Message />
      <p className="home__section-title">Scheduled Today</p>
      <ScheduledCard />

      <p className="home__section-title">Your Routines</p>
      {/* {routines.map((routine) => (
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
      ))} */}

      <p className="home__section-title">Your Routines</p>

      {routines.map((routine) => (
        <RoutineCard
          key={routine.id}
          routineName={routine.name}
          numExercises={routine.numExercises} // adjust these prop names based on your data structure
          numSets={routine.numSets}
          onStart={() => handleStart(routine.id)}
          isLoading={loadingId === routine.id}
        />
      ))}

      {/* {routines.map((routine) => (
        <RoutineCard routineId={routine.id} routineName={routine.name} numExercises={6} numSets={17} />
      ))} */}

      {/* <RoutineCard routineName={"Push Day"} numExercises={6} numSets={17} /> */}
    </div>
  );
}

export default Home;
