import React from 'react';

function Square({ value, onClick, isWinningSquare }) {
  return (
    <button
      type="button"
      className={`square ${isWinningSquare ? 'winning' : ''} ${
        value === 'X' ? 'text-green' : 'text-orange'
      }`}
      onClick={onClick}
      style={{ fontWeight: isWinningSquare ? 'bold' : 'normal' }}
    >
      {value}
    </button>
  );
}

export default Square;
