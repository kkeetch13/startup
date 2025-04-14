

import React, { useEffect, useState } from 'react';
import { getHighScores } from '../api.js';

export default function Scores() {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchScores() {
      try {
        const result = await getHighScores();

        setScores(result.scores);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchScores();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>High Scores</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {scores.length === 0 ? (
        <p>No scores to display</p>
      ) : (
        <ul>
          {scores.map((score, idx) => (
            <li key={idx}>
              {score.name} - {score.time} seconds - {score.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
