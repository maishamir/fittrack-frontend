import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Workout() {
  const { sessionId } = useParams();

  return (
    <div>
      <h1>Workout Page</h1>
      <p>Session ID: {sessionId}</p>
    </div>
  )
}

export default Workout