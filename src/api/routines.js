import axios from "axios";

const BASE_URL = "http://localhost:3000";

export async function getRoutines() {
  const response = await axios.get(`${BASE_URL}/routines`);
  return response.data;
}



export async function startSession(routineId, routineDate) {
  const response = await axios.post(
    `${BASE_URL}/routines/${routineId}/sessions`, routineDate
  );
  return response.data;
}

export async function deleteRoutine(routineId) {
  const response = await axios.delete(`${BASE_URL}/routines/${routineId}`);
  return response.data;
}

export async function createRoutine(routineData) {
  const response = await axios.post(`${BASE_URL}/routines/`, routineData);
  return response.data;
}

export async function getRoutineById(routineId) {
  const response = await axios.get(`${BASE_URL}/routines/${routineId}`)
  return response.data;
}

export async function editRoutine(routineId, routineData) {
    const response = await axios.patch(`${BASE_URL}/routines/${routineId}`, routineData);
    return response.data;
}