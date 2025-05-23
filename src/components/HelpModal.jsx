import '../styles/App.css';

const HelpModal = ({ onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>How to Play Blink Tac Toe</h2>
                <ul>
                    <li>Players take turns placing emojis on a 3x3 grid</li>
                    <li>Each player can have only 3 emojis on the board at any time</li>
                    <li>When placing a 4th emoji, your oldest emoji disappears</li>
                    <li>You can't place your 4th emoji where your 1st emoji was</li>
                    <li>First to get 3 of their emojis in a row wins!</li>
                </ul>
            </div>
        </div>
    );
};

export default HelpModal;