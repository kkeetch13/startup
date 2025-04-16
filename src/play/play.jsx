import React, { useState, useEffect } from 'react';
import PegRow from '../components/PegRow';
import { submitScore } from '../api.js';
import { useNavigate } from 'react-router-dom';

function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function Play({ userName }) {
  const navigate = useNavigate();
  const availableColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];


  useEffect(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const socket = new WebSocket(`${protocol}://${window.location.host}`);

    socket.onopen = () => {
      console.log('WebSocket connected');
      socket.send('Client connected from Play.jsx!');
    };

    socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    socket.onerror = (err) => {
      console.error('WebSocket error:', err);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => socket.close();
  }, []);
  // ----------------------------

  const generateSecret = () => {
    const secret = [];
    for (let i = 0; i < 4; i++) {
      const randIndex = Math.floor(Math.random() * availableColors.length);
      secret.push(availableColors[randIndex]);
    }
    return secret;
  };

  const [secret, setSecret] = useState(generateSecret());
  const [guess, setGuess] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('Make your guess by selecting 4 colors.');
  const [history, setHistory] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());
  const [scoreSubmitted, setScoreSubmitted] = useState(false);

  const resetGame = () => {
    setSecret(generateSecret());
    setGuess([]);
    setFeedbackMessage('New game! Make your guess by selecting 4 colors.');
    setHistory([]);
    setStartTime(Date.now());
    setScoreSubmitted(false);
  };

  const handleColorClick = (color) => {
    if (guess.length < 4) {
      setGuess([...guess, color]);
    }
  };

  const getFeedback = (secretArray, guessArray) => {
    const secretCopy = [...secretArray];
    const guessCopy = [...guessArray];
    let greens = 0;
    for (let i = 0; i < guessCopy.length; i++) {
      if (guessCopy[i] === secretCopy[i]) {
        greens++;
        secretCopy[i] = null;
        guessCopy[i] = null;
      }
    }
    let yellows = 0;
    for (let i = 0; i < guessCopy.length; i++) {
      if (guessCopy[i] !== null) {
        const idx = secretCopy.indexOf(guessCopy[i]);
        if (idx !== -1) {
          yellows++;
          secretCopy[idx] = null;
          guessCopy[i] = null;
        }
      }
    }
    const blanks = 4 - (greens + yellows);
    const feedbackArray = [];
    for (let i = 0; i < greens; i++) feedbackArray.push('green');
    for (let i = 0; i < yellows; i++) feedbackArray.push('yellow');
    for (let i = 0; i < blanks; i++) feedbackArray.push('blank');
    return feedbackArray;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (guess.length !== 4) {
      setFeedbackMessage('Please select exactly 4 colors.');
      return;
    }
    const feedbackPegs = getFeedback(secret, guess);
    const greenCount = feedbackPegs.filter((peg) => peg === 'green').length;

    setHistory([...history, { guess: [...guess], feedback: feedbackPegs }]);
    if (greenCount === 4) {
      const finishTime = (Date.now() - startTime) / 1000;
      setFeedbackMessage(`Congratulations! You cracked the code in ${finishTime} seconds. Your score has been submitted.`);
      if (!scoreSubmitted) {
        try {
          await submitScore(userName || "Anonymous", finishTime, new Date().toLocaleDateString());
          setScoreSubmitted(true);
        } catch (err) {
          console.error("Score submission error", err);
          setFeedbackMessage("You cracked the code, but there was an error submitting your score.");
        }
      }
    } else {
      setFeedbackMessage('Try again!');
      setGuess([]);
    }
  };

  return (
    <main
      className="container-fluid text-center py-5"
      style={{ backgroundColor: '#666', minHeight: '100vh' }}
    >
      <h1 style={{ color: '#ddd' }}>Mastermind Game</h1>
      <p style={{ color: '#fff' }}>{feedbackMessage}</p>
      <div className="mb-3">
        {availableColors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorClick(color)}
            style={{
              backgroundColor: color,
              border: 'none',
              padding: '10px 15px',
              margin: '5px',
              borderRadius: '4px',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {color}
          </button>
        ))}
      </div>
      <div className="mb-3" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
        {guess.length === 0 && <p style={{ color: '#fff' }}>Your guess: none</p>}
        {guess.map((color, idx) => (
          <div
            key={idx}
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: color,
              borderRadius: '50%',
              border: '2px solid #333'
            }}
          />
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <button 
          type="submit"
          className="btn btn-primary me-2"
          disabled={guess.length !== 4}
          style={{ marginRight: '5px' }}
        >
          Submit Guess
        </button>
        <button type="button" onClick={resetGame} className="btn btn-secondary">
          Reset Game
        </button>
        <button 
          type="button" 
          className="btn btn-info ms-2"
          onClick={() => navigate('/scores')}
        >
          View Scores
        </button>
      </form>
      {history.length > 0 && (
        <div className="history" style={{ marginTop: '2rem', color: '#fff' }}>
          <h3>History</h3>
          {history.map((entry, idx) => {
            const chunkedPegs = chunkArray(entry.feedback, 2);
            return (
              <div
                key={idx}
                className="history-entry"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', gap: '5px' }}>
                  {entry.guess.map((c, i) => (
                    <div
                      key={i}
                      style={{
                        width: '30px',
                        height: '30px',
                        backgroundColor: c,
                        borderRadius: '50%',
                        border: '2px solid #333'
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '5px'
                  }}
                >
                  {chunkedPegs.map((row, rIdx) =>
                    row.map((pegColor, pIdx) => (
                      <div
                        key={`${rIdx}-${pIdx}`}
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: '2px solid #333',
                          backgroundColor:
                            pegColor === 'green'
                              ? 'green'
                              : pegColor === 'yellow'
                              ? 'yellow'
                              : 'lightgray'
                        }}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
