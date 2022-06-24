import React, { useState } from 'react';
import Board from './components/Board';
import History from './components/History';
import { calculateWinner } from './helper';
import StatusMessage from './components/StatusMessage';
import './style/root.scss';

const NEW_GAME = [{ board: Array(9).fill(null), isXNext: true }];

function App() {
  const [history, setHistory] = useState(NEW_GAME);

  const [currentMove, setCurrentMove] = useState(0);
  const current = history[currentMove];

  const { winner, winningSquares } = calculateWinner(current.board);

  const handleSquareClick = position => {
    if (current.board[position] || winner) {
      return;
    }

    setHistory(prev => {
      const last = prev[prev.length - 1];

      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isXNext ? 'X' : 'O';
        }
        return square;
      });
      return prev.concat({ board: newBoard, isXNext: !last.isXNext });
    });
    setCurrentMove(prev => prev + 1);
  };

  const moveTo = move => {
    setCurrentMove(move);
  };

  const newGame = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        TIC <span className="text-green">TACK</span> TOE!
      </h1>
      <StatusMessage winner={winner} current={current} />
      <Board
        board={current.board}
        handleSquareClick={handleSquareClick}
        winningSquares={winningSquares}
      />
      <h2 style={{ fontWeight: 'normal' }}>Current game history</h2>
      <button
        type="button"
        onClick={newGame}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        Start new game
      </button>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls" />
    </div>
  );
}
export default App;
