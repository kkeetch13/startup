import React, { useEffect, useState } from 'react';

export default function About() {
  const [advice, setAdvice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAdvice() {
      try {
        console.log("Fetching advice...");
        const response = await fetch('https://api.adviceslip.com/advice');
        if (!response.ok) {
          throw new Error('Failed to fetch advice');
        }
        const data = await response.json();
        console.log("Advice response data:", data);
        setAdvice(data.slip.advice);
      } catch (err) {
        console.error("Error fetching advice:", err);
        setError('Unable to load advice at this time.');
      }
    }
    fetchAdvice();
  }, []);

  return (
    <main style={{ padding: '1rem', backgroundColor: '#333', color: '#fff' }}>
      <h1>About</h1>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <blockquote style={{ fontStyle: 'italic', borderLeft: '4px solid #ccc', paddingLeft: '1rem' }}>
          <p>"{advice}"</p>
        </blockquote>
      )}
      
      <div className="elevator-pitch">
        <p>
          Hi, I'm Kaden Keetch, a computer science and political science double major
          passionate about turning ideas into functional and engaging digital experiences.
          My work showcases my skills in programming, web‑development, and crafting
          user‑friendly solutions.
        </p>
        <p>
          Click around to see some of my interests, projects, and even my resume.
        </p>
        <p>
          The name Mastermind is a registered trademark of Invicta Plastics. My use of the
          name and the game is for non-profit educational use only. No part of this code or
          program should be used outside of that definition.
        </p>
      </div>
    </main>
  );
}
