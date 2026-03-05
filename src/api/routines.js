import axios from "axios";

const BASE_URL = "http://localhost:3000";

export async function getRoutines() {
    const response = await axios.get(`${BASE_URL}/routines`);
    return response.data;
}

export async function startSession(routineId) {
    const response = await axios.post(`${BASE_URL}/routines/${routineId}/sessions`);
    return response.data;
}

export async function deleteRoutine(routineId) {
    const response = await axios.delete(`${BASE_URL}/routines/${routineId}`)
    return response.data;
}

export async function createRoutine(routineData) {
    const response = await axios.post(`${BASE_URL}/routines/`, routineData);
    return response.data;
}