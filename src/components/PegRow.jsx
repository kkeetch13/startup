import React from 'react';
import './PegRow.css';

/**
 * 
 * @param {Object} props
 * @param {string[]} props.pegColors - Array of feedback colors for the pegs.
 */
function PegRow({ pegColors }) {
  return (
    <div className="peg-row">
      {pegColors.map((color, index) => (
        <div
          key={index}
          className={`peg ${color}`}
          style={{ backgroundColor: color === 'blank' ? 'lightgray' : color }}
          title={color}
        />
      ))}
    </div>
  );
}

export default PegRow;
