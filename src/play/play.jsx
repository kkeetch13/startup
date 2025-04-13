import React, { useState } from 'react';

export function Play() {
  const availableColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

  const generateSecret = () => {
    const secret = [];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      secret.push(availableColors[randomIndex]);
    }
    return secret;
  };

  const [secret, setSecret] = useState(generateSecret());
  const [guess, setGuess] = useState([]);
  const [feedback, setFeedback] = useState('Make your guess by selecting 4 colors.');

  const resetGame = () => {
    setSecret(generateSecret());
    setGuess([]);
    setFeedback('New game! Make your guess by selecting 4 colors.');
  };

  const handleColorClick = (color) => {
    if (guess.length < 4) {
      setGuess([...guess, color]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.length !== 4) {
      setFeedback('Please select exactly 4 colors.');
      return;
    }
    let correctPositions = 0;
    for (let i = 0; i < 4; i++) {
      if (guess[i] === secret[i]) {
        correctPositions++;
      }
    }
    if (correctPositions === 4) {
      setFeedback('Congratulations! You cracked the code.');
      resetGame();
    } else {
      setFeedback(`You have ${correctPositions} color(s) in the correct position.`);
      setGuess([]);
    }
  };

  return (
    <main className="container-fluid bg-secondary text-center py-5">
      <h1>Mastermind Game</h1>
      <p>{feedback}</p>
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
      <div className="mb-3">
        <p>Your guess: {guess.join(', ') || 'none'}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <button 
          type="submit"
          className="btn btn-primary me-2"
          disabled={guess.length !== 4}
        >
          Submit Guess
        </button>
        <button type="button" onClick={resetGame} className="btn btn-secondary">
          Reset Game
        </button>
      </form>
    </main>
  );
}
