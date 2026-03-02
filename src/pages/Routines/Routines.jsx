import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Play } from 'lucide-react'
import "./Routines.scss";
import Layout from '../../components/Layout/Layout';

function RoutinesList() {
    const navigate = useNavigate();

    // State to hold all routines
    // HARDCODED TEST DATA - Replace with actual API call later
    const [routines, setRoutines] = useState([
        {
            id: 1,
            name: "Push Day",
            routineExercises: [
                {
                    id: 1,
                    sectionLabel: "Warm Up",
                    exercise: { name: "Face Pull" },
                    routineSets: [
                        { targetMaxReps: 15 },
                        { targetMaxReps: 15 }
                    ]
                },
                {
                    id: 2,
                    sectionLabel: "Main Workout",
                    exercise: { name: "Bench Press" },
                    routineSets: [
                        { targetMaxReps: 8 },
                        { targetMaxReps: 8 },
                        { targetMaxReps: 8 },
                        { targetMaxReps: 8 }
                    ]
                },
                {
                    id: 3,
                    sectionLabel: "Main Workout",
                    exercise: { name: "Overhead Press" },
                    routineSets: [
                        { targetMaxReps: 10 },
                        { targetMaxReps: 10 },
                        { targetMaxReps: 10 }
                    ]
                },
                {
                    id: 4,
                    sectionLabel: "Main Workout",
                    exercise: { name: "Incline Dumbbell Press" },
                    routineSets: [
                        { targetMaxReps: 12 },
                        { targetMaxReps: 12 },
                        { targetMaxReps: 12 }
                    ]
                },
                {
                    id: 5,
                    sectionLabel: "Main Workout",
                    exercise: { name: "Lateral Raise" },
                    routineSets: [
                        { targetMaxReps: 15 },
                        { targetMaxReps: 15 },
                        { targetMaxReps: 15 }
                    ]
                },
                {
                    id: 6,
                    sectionLabel: "Cool Down",
                    exercise: { name: "Cable Fly" },
                    routineSets: [
                        { targetMaxReps: 20 },
                        { targetMaxReps: 20 }
                    ]
                }
            ]
        },
        {
            id: 2,
            name: "Helloooo",
            routineExercises: [
                {
                    id: 7,
                    sectionLabel: "Warm Up",
                    exercise: { name: "Leg Curl" },
                    routineSets: [
                        { targetMaxReps: 10 },
                        { targetMaxReps: 10 },
                        { targetMaxReps: 10 }
                    ]
                },
                {
                    id: 8,
                    sectionLabel: "Main Workout",
                    exercise: { name: "Leg Extension" },
                    routineSets: [
                        { targetMaxReps: 10 },
                        { targetMaxReps: 10 },
                        { targetMaxReps: 10 }
                    ]
                },
                {
                    id: 9,
                    sectionLabel: "Cool Down",
                    exercise: { name: "Cable Fly" },
                    routineSets: [
                        { targetMaxReps: 10 },
                        { targetMaxReps: 10 },
                        { targetMaxReps: 10 }
                    ]
                }
            ]
        }
    ]);

    // Fetch routines on component mount
    useEffect(() => {
        async function fetchRoutines() {
            // You'll replace this with your actual API call
            // const data = await getRoutines();
            // setRoutines(data);
            console.log('Using hardcoded test data...');
        }

        fetchRoutines();
    }, []);

    // Handle clicking the New button
    function handleNewRoutine() {
        navigate('/routines/createRoutine');
    }

    // Handle clicking the Play button
    function handlePlayRoutine(routineId) {
        console.log('Starting routine:', routineId);
        // You'll add navigation to workout session here
    }

    // Handle clicking Edit button
    function handleEditRoutine(routineId) {
        console.log('Editing routine:', routineId);
        // You'll add navigation to edit page here
    }

    // Handle clicking Delete button
    function handleDeleteRoutine(routineId) {
        console.log('Deleting routine:', routineId);
        // You'll add delete confirmation and API call here
    }

    // Group exercises by section for display
    function groupExercisesBySection(routineExercises) {
        const grouped = {};

        routineExercises.forEach((re) => {
            if (!grouped[re.sectionLabel]) {
                grouped[re.sectionLabel] = [];
            }
            grouped[re.sectionLabel].push(re);
        });

        return grouped;
    }

    return (
        <Layout >
            <div className="routines-list">
                {/* Header with title and New button */}
                <div className="routines-list__header">
                    <h1 className="routines-list__title">Routines</h1>
                    <button
                        className="routines-list__new-btn"
                        onClick={handleNewRoutine}
                    >
                        <Plus size={16} />
                        New
                    </button>
                </div>

                {/* List of routine cards */}
                <div className="routines-list__cards">
                    {routines.map((routine) => {
                        const numExercises = routine.routineExercises?.length || 0;
                        const numSets = routine.routineExercises?.reduce((total, re) => {
                            return total + (re.routineSets?.length || 0);
                        }, 0) || 0;
                        const groupedExercises = groupExercisesBySection(routine.routineExercises || []);

                        return (
                            <div
                                key={routine.id}
                                className="routines-list__card"
                            >
                                {/* Card header */}
                                <div className="routines-list__card-header">
                                    <div className="routines-list__card-info">
                                        <h2 className="routines-list__card-name">{routine.name}</h2>
                                        <p className="routines-list__card-stats">
                                            {numExercises} exercises • {numSets} sets
                                        </p>
                                    </div>
                                    <button
                                        className="routines-list__play-btn"
                                        onClick={() => handlePlayRoutine(routine.id)}
                                    >
                                        <Play color='white' size={20} />
                                    </button>
                                </div>

                                {/* Card body - always visible */}
                                <div className="routines-list__card-body">
                                    {/* Loop through each section */}
                                    {Object.entries(groupedExercises).map(([sectionLabel, exercises]) => (
                                        <div key={sectionLabel} className="routines-list__section">
                                            <h3 className="routines-list__section-label">{sectionLabel}</h3>

                                            {/* Loop through exercises in this section */}
                                            <div className="routines-list__section-exercises">
                                                {exercises.map((re) => (
                                                    <div key={re.id} className="routines-list__exercise">
                                                        <span className="routines-list__exercise-name">
                                                            {re.exercise.name}
                                                        </span>
                                                        <span className="routines-list__exercise-sets">
                                                            {re.routineSets.length} × {re.routineSets[0]?.targetMaxReps || re.routineSets[0]?.targetExactReps || '?'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Card footer - Edit and Delete buttons */}
                                <div className="routines-list__card-footer">
                                    <button
                                        className="routines-list__edit-btn"
                                        onClick={() => handleEditRoutine(routine.id)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="routines-list__delete-btn"
                                        onClick={() => handleDeleteRoutine(routine.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}

export default RoutinesList;