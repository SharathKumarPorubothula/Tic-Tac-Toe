import '../styles/App.css';

const Cell = ({ value, isWinning, onClick }) => {
    return (
        <div 
            className={`cell ${isWinning ? 'winning-cell' : ''}`}
            onClick={onClick}
        >
            {value?.emoji}
        </div>
    );
};

export default Cell;