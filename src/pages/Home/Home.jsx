import { useState, useEffect } from "react";
import { getRoutines, startSession } from "../../api/routines";
import { useNavigate } from "react-router-dom";
import { Flame, TrendingUp, Calendar, CheckCircle2 } from "lucide-react";
import StatCard from "../../components/Home/StatCard/StatCard";
import Message from "../../components/Home/Message/Message";
import ScheduledCard from "../../components/Home/Scheduled/Scheduled";
import RoutineCard from "../../components/Home/RoutineCard/RoutineCard";
import Layout from "../../components/Layout/Layout";
import "./Home.scss";


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

  console.log(routines);

  return (
    <Layout>
      <div className="home">

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

        {routines.map((routine) => {
          const numExercises = routine.routineExercises?.length || 0;
          const numSets = routine.routineExercises?.reduce((total, re) => {
            return total + (re.routineSets?.length || 0);
          }, 0) || 0;
          

          return (
            <RoutineCard
              key={routine.id}
              routineName={routine.name}
              numExercises={numExercises}
              numSets={numSets}
              onStart={() => handleStart(routine.id)}
              isLoading={loadingId === routine.id}
            />
          );
        })}
      </div>
    </Layout>
  );
}

export default Home;
