import axios from "axios";
const BASE_URL = "http://localhost:3000";

export async function createUser(userData) {
    const response = await axios.post(`${BASE_URL}/users/`, userData);
    return response.data;
}

export async function getSessionsByUserId(userId) {
    const response = await axios.get(`${BASE_URL}/sessions`, { params: { userId } })
    return response.data;
}

export async function getRoutinesByUserId(userId) {
    const response = await axios.get(`${BASE_URL}/routines`, { params: { userId } })
    return response.data;
}

