import React, { useState } from 'react';

export function Play() {
  const availableColors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
  const secret = ['red', 'blue', 'green', 'yellow']; // Placeholder secret sequence
  const [guess, setGuess] = useState([]);
  const [feedback, setFeedback] = useState('Make a guess (4 colors)');

  const handleColorClick = (color) => {
    if (guess.length < 4) {
      setGuess([...guess, color]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.length !== 4) {
      setFeedback('Please choose 4 colors.');
      return;
    }
    let correct = 0;
    for (let i = 0; i < 4; i++) {
      if (guess[i] === secret[i]) correct++;
    }
    if (correct === 4) {
      setFeedback('Correct! You cracked the code.');
    } else {
      setFeedback(`You have ${correct} color(s) correct in the right position.`);
    }
  };

  const handleReset = () => {
    setGuess([]);
    setFeedback('Make a guess (4 colors)');
  };

  return (
    <main className="container-fluid bg-secondary text-center py-5">
      <h1>Mastermind</h1>
      <p>{feedback}</p>
      <div>
        {availableColors.map((color) => (
          <button
            key={color}
            onClick={() => handleColorClick(color)}
            style={{
              backgroundColor: color,
              border: 'none',
              margin: '0.5rem',
              padding: '1rem',
              color: '#fff',
              cursor: 'pointer'
            }}
          >
            {color}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <p>Your Guess: {guess.join(', ')}</p>
      </div>
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <button type="submit" className="btn btn-primary me-2">
          Submit Guess
        </button>
        <button type="button" onClick={handleReset} className="btn btn-secondary">
          Reset
        </button>
      </form>
    </main>
  );
}
