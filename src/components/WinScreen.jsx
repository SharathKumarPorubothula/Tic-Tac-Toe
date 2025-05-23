import '../styles/App.css';

const WinScreen = ({ winner, onPlayAgain }) => {
    return (
        <div className="win-screen">
            <h2>Player {winner} Wins!</h2>
            <button className="btn" onClick={onPlayAgain}>Play Again</button>
        </div>
    );
};

export default WinScreen;