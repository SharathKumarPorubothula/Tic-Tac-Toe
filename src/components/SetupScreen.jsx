import '../styles/App.css';

const SetupScreen = ({ 
    player1Category, 
    player2Category, 
    gameMode, 
    onCategoryChange, 
    onModeChange, 
    onStartGame, 
    onShowHelp 
}) => {
    return (
        <div className="setup-screen">
            <h2>Game Setup</h2>
            <div className="player-setup">
                <div className="player-option">
                    <h3>Player 1 Category</h3>
                    <select 
                        value={player1Category}
                        onChange={(e) => onCategoryChange('player1', e.target.value)}
                    >
                        <option value="animals">Animals</option>
                        <option value="food">Food</option>
                        <option value="sports">Sports</option>
                    </select>
                </div>
                <div className="player-option">
                    <h3>Player 2 Category</h3>
                    <select 
                        value={player2Category}
                        onChange={(e) => onCategoryChange('player2', e.target.value)}
                    >
                        <option value="animals">Animals</option>
                        <option value="food">Food</option>
                        <option value="sports">Sports</option>
                    </select>
                </div>
            </div>
            <div className="game-mode">
                <h3>Game Mode</h3>
                <div className="mode-options">
                    <label>
                        <input 
                            type="radio" 
                            name="mode" 
                            value="1v1" 
                            checked={gameMode === '1v1'}
                            onChange={() => onModeChange('1v1')}
                        /> 1 vs 1
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            name="mode" 
                            value="ai" 
                            checked={gameMode === 'ai'}
                            onChange={() => onModeChange('ai')}
                        /> 1 vs AI
                    </label>
                </div>
            </div>
            <button className="btn" onClick={onStartGame}>Start Game</button>
            <button className="btn help-btn" onClick={onShowHelp}>How to Play</button>
        </div>
    );
};

export default SetupScreen;