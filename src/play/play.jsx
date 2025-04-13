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
  const [history, setHistory] = useState([]);

  const resetGame = () => {
    setSecret(generateSecret());
    setGuess([]);
    setFeedback('New game! Make your guess by selecting 4 colors.');
    setHistory([]);
  };

  const handleColorClick = (color) => {
    if (guess.length < 4) {
      setGuess([...guess, color]);
    }
  };

  // Calculate feedback as total counts of green (correct color + position)
  // and yellow (correct color but wrong position)
  const calculateFeedback = (secretArray, guessArray) => {
    let greens = 0;
    let yellows = 0;
    const secretFreq = {};
    const guessFreq = {};

    // First pass: Count greens
    for (let i = 0; i < 4; i++) {
      if (guessArray[i] === secretArray[i]) {
        greens++;
      } else {
        secretFreq[secretArray[i]] = (secretFreq[secretArray[i]] || 0) + 1;
        guessFreq[guessArray[i]] = (guessFreq[guessArray[i]] || 0) + 1;
      }
    }

    // Second pass: Count yellows from non-green positions
    for (const color in guessFreq) {
      if (secretFreq[color]) {
        yellows += Math.min(secretFreq[color], guessFreq[color]);
      }
    }

    return { greens, yellows };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guess.length !== 4) {
      setFeedback('Please select exactly 4 colors.');
      return;
    }
    const { greens, yellows } = calculateFeedback(secret, guess);
    // Append this guess to the history
    setHistory((prevHistory) => [
      ...prevHistory,
      { guess: [...guess], greens, yellows },
    ]);
    if (greens === 4) {
      setFeedback('Congratulations! You cracked the code.');
      // Reset after a short delay
      setTimeout(() => {
        resetGame();
      }, 2000);
    } else {
      setFeedback(`Feedback: ${greens} green, ${yellows} yellow`);
      setGuess([]); // clear guess for the next attempt
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
              cursor: 'pointer',
            }}
          >
            {color}
          </button>
        ))}
      </div>
      <div className="mb-3">
        <p>Your guess: {guess.length > 0 ? guess.join(', ') : 'none'}</p>
      </div>
      <form onSubmit={handleSubmit} className="mb-3">
        <button
          type="submit"
          className="btn btn-primary me-2"
          disabled={guess.length !== 4}
        >
          Submit Guess
        </button>
        <button
          type="button"
          onClick={resetGame}
          className="btn btn-secondary"
        >
          Reset Game
        </button>
      </form>
      {history.length > 0 && (
        <div className="mt-4">
          <h2>Guess History</h2>
          <table className="table table-light table-bordered w-50 mx-auto">
            <thead>
              <tr>
                <th>Guess</th>
                <th>Green</th>
                <th>Yellow</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.guess.join(', ')}</td>
                  <td>{entry.greens}</td>
                  <td>{entry.yellows}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
