import axios from "axios";

const BASE_URL = "http://localhost:3000";

export async function getExercises() {
    const response = await axios.get(`${BASE_URL}/exercises`)
    return response.data;
}