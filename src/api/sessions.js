import axios from "axios";

const BASE_URL = "http://localhost:3000";

export async function getSessions() {
  const response = await axios.get(`${BASE_URL}/sessions`);
  return response.data;
}

export async function getScheduledSessions() {
  const response = await axios.get(`${BASE_URL}/sessions/scheduled`);
  return response.data;
}

export async function getTodaysSessions() {
  const response = await axios.get(`${BASE_URL}/sessions/today`);
  return response.data;
}

export async function updateSet(setId, data) {
  const response = await axios.patch(
    `${BASE_URL}/sessions/sets/${setId}`,
    data,
  );
  return response.data;
}

export async function completeSession(sessionId) {
  const response = await axios.patch(
    `${BASE_URL}/sessions/${sessionId}/complete`,
  );
  return response.data;
}

export async function getSessionById(sessionId) {
  const response = await axios.get(`${BASE_URL}/sessions/${sessionId}`);
  return response.data;
}

export async function deleteSession(sessionId) {
  const response = await axios.delete(`${BASE_URL}/sessions/${sessionId}`);
  return response.data;
}
