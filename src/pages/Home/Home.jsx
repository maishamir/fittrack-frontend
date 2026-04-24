import { useState, useEffect } from "react";
import { getRoutines, startSession } from "../../api/routines";
import { useNavigate } from "react-router-dom";
import { Flame, TrendingUp, Calendar, CheckCircle2, Check } from "lucide-react";
import StatCard from "../../components/Home/StatCard/StatCard";
import Message from "../../components/Home/Message/Message";
import Scheduled from "../../components/Home/Scheduled/Scheduled";
import RoutineCard from "../../components/Home/RoutineCard/RoutineCard";
import Layout from "../../components/Layout/Layout";
import "./Home.scss";
import { getTodaysSessions } from "../../api/sessions";

function Home() {
  const [routines, setRoutines] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [todaySessions, setTodaySessions] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRoutines() {
      const data = await getRoutines();
      setRoutines(data);
    }

    fetchRoutines();
  }, []);

  useEffect(() => {
    async function fetchTodaysSessions() {
      const data = await getTodaysSessions();
      setTodaySessions(data);
    }
    fetchTodaysSessions();
  }, []);

  async function handleStart(routineId) {
    try {
      setLoadingId(routineId);
      const today = new Date();
      const routineDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      );

      const session = await startSession(routineId, { date: routineDate });

      const sessionId = session.id ?? session.session.Id;
      navigate(`/workout/${sessionId}`);
    } finally {
      setLoadingId(null);
    }
  }

  // meant for showing upto 3 routines on the homepage to avoid clutter
  const visibleCards = routines.slice(0, 3);

  // console.log(todaySessions.every());
  //   todaySessions?.forEach((session) => console.log(session.completed));
  let allComplete = todaySessions?.every((session) => session.completed);

  let numTotal = todaySessions?.filter((session) => session.completed);

  return (
    <Layout>
      <div className="home">
        <div className="home__stats">
          <StatCard
            icon={<Flame color="#FF8904" />}
            text={"streak"}
            cardContent={"0"}
          />
          <StatCard
            icon={<TrendingUp color="#51A2FF" />}
            text={"total"}
            cardContent={numTotal ? numTotal.length : 0}
          />
          <StatCard
            icon={<Calendar color="#C27AFF" />}
            text={"today"}
            cardContent={allComplete ? <Check /> : "-"}
          />
        </div>

        <Message />
        <p className="home__section-title">Scheduled Today</p>

        <div className="home__today">
          {todaySessions?.map((session) => {
            const numExercises = session.sessionExercises?.length || 0;
            return (
              <Scheduled
                key={session.id}
                routineName={session.routineNameSnapshot}
                exerciseCount={numExercises}
                onStart={() => navigate(`/workout/${session.id}`)}
              />
            );
          })}
        </div>

        <p className="home__section-title">Your Routines</p>

        <div className="home__routines-list">
          {visibleCards.map((routine) => {
            const numExercises = routine.routineExercises?.length || 0;
            const numSets =
              routine.routineExercises?.reduce((total, re) => {
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

          <button
            className="home__seeAllRoutines"
            onClick={() => navigate("/routines")}
          >
            See all routines
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
