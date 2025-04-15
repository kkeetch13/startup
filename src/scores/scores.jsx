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
        setError('Failed to fetch scores. Please try again later.');
        console.error('Score fetch error:', err);
      }
    }
    fetchScores();
  }, []);

  return (
    <main className="container py-4 text-center text-light">
      <h2>Top 10 High Scores</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {scores.length === 0 ? (
        <p>No scores to display</p>
      ) : (
        <table className="table table-dark table-striped table-bordered mt-4">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Time (s)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{score.name}</td>
                <td>{score.time}</td>
                <td>{score.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
