import '../styles/App.css';
import GameBoard from './GameBoard';

const GameScreen = ({ 
    currentPlayer, 
    board, 
    scores, 
    onCellClick, 
    onRestart, 
    onNewGame 
}) => {
    return (
        <div className="game-screen">
            <div className="game-header">
                <div 
                    className="player-turn" 
                    style={{ backgroundColor: currentPlayer === 1 ? '#3498db' : '#e74c3c' }}
                >
                    Player {currentPlayer}'s Turn
                </div>
                <div className="scores">
                    <span>Player 1: {scores[0]}</span>
                    <span>Player 2: {scores[1]}</span>
                </div>
            </div>
            
            <GameBoard board={board} onCellClick={onCellClick} />
            
            <div className="game-footer">
                <button className="btn" onClick={onRestart}>Restart Game</button>
                <button className="btn" onClick={onNewGame}>New Game</button>
            </div>
        </div>
    );
};

export default GameScreen;