import { useEffect, useState } from "react";
import "./EditRoutine.scss";
import { getRoutineById } from "../../api/routines";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { X } from "lucide-react";

function EditRoutine() {
    const { routineId } = useParams();
    const [routineName, setRoutineName] = useState("");
    const [routineDetails, setRoutineDetails] = useState();
    const [routineExercises, setRoutineExercises] = useState({})
    const navigate = useNavigate();


    function handleInputChange() {

    }

    useEffect(() => {
        const fetchRoutineDetails = async () => {
            try {
                const response = await getRoutineById(routineId);
                setRoutineDetails(response);
                setRoutineExercises(response.routineExercises);
                setRoutineName(response.name);

            }
            catch (err) {
                console.error("Failed to fetch routine => ", err);
            }
        }
        fetchRoutineDetails();
    }, [routineId])

    console.log(routineExercises);
    

    return (
        <Layout>
            <div className="create-routine">
                <div className="create-routine__header">
                    <h1 className="create-routine__title">Edit Routine</h1>
                    <button className="create-routine__close" onClick={() => navigate("/routines")}>
                        <X color="#90A1B9" size={20} />
                    </button>
                </div>

                <input type="text" name="" id="" className="create-routine__name-input" placeholder="Routine name (e.g., Push Day)" value={routineName} onChange={(e) => setRoutineName(e.target.value)}/>

                <div className="create-routine__sections">

                </div>
            </div>
        </Layout>
    )
}

export default EditRoutine