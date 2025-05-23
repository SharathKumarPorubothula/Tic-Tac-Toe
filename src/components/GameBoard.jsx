import '../styles/App.css';
import Cell from './Cell';

const GameBoard = ({ board, onCellClick }) => {
    return (
        <div className="game-board">
            {board.map((cell, index) => (
                <Cell
                    key={index}
                    value={cell}
                    isWinning={cell?.isWinning || false}
                    onClick={() => onCellClick(index)}
                />
            ))}
        </div>
    );
};

export default GameBoard;