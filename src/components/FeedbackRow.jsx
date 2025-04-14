import React from 'react';

/**
 * 
 * @param {string} secret - The secret code (e.g., "RRYB")
 * @param {string} guess  - The player's guess (e.g., "RYBG")
 * @returns {string[]} An array with feedback for each slot.
 */
function getPerSlotFeedback(secret, guess) {
  const n = secret.length;
  const feedback = new Array(n).fill('blank');


  const secretFreq = {};
  for (let i = 0; i < n; i++) {
    const letter = secret[i];
    secretFreq[letter] = (secretFreq[letter] || 0) + 1;
  }


  for (let i = 0; i < n; i++) {
    if (guess[i] === secret[i]) {
      feedback[i] = 'green';
      secretFreq[guess[i]] -= 1;
    }
  }


  for (let i = 0; i < n; i++) {
    if (feedback[i] === 'blank') {
      const guessedLetter = guess[i];
      
      if (secretFreq[guessedLetter] > 0) {
        feedback[i] = 'yellow';
        secretFreq[guessedLetter] -= 1;
      }
    }
  }

  return feedback;
}


function FeedbackRow({ secret, guess }) {
  const feedback = getPerSlotFeedback(secret, guess);

  return (
    <div className="feedback-row" style={{ display: 'flex', gap: '0.5rem' }}>
      {feedback.map((peg, index) => (
        <div
          key={index}
          className={`peg ${peg}`}
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '1px solid #333',
            backgroundColor:
              peg === 'green' ? 'green' : peg === 'yellow' ? 'yellow' : 'lightgray',
          }}
          title={peg}
        ></div>
      ))}
    </div>
  );
}

export default FeedbackRow;
