import { useState, useEffect } from 'react';
import {
    getRandomEmoji,
    checkWinForPlayer,
    getWinningCombination
} from './utils/gameLogic';
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';
import WinScreen from './components/WinScreen';
import HelpModal from './components/HelpModal';
import './styles/App.css';
import './styles/index.css';

const App = () => {
    const [screen, setScreen] = useState('setup');
    const [player1Category, setPlayer1Category] = useState('animals');
    const [player2Category, setPlayer2Category] = useState('animals');
    const [gameMode, setGameMode] = useState('1v1');
    const [showHelp, setShowHelp] = useState(false);
    const [isAIMoving, setIsAIMoving] = useState(false);
    const [gameState, setGameState] = useState({
        board: Array(9).fill(null),
        currentPlayer: 1,
        player1Emojis: [],
        player2Emojis: [],
        player1Positions: [],
        player2Positions: [],
        gameOver: false,
        scores: [0, 0],
        winner: null,
        isDraw: false
    });

    // Use useEffect to handle AI moves after state updates
    useEffect(() => {
        if (gameMode === 'ai' && 
            gameState.currentPlayer === 2 && 
            !gameState.gameOver && 
            !isAIMoving && 
            screen === 'game') {
            makeAIMove();
        }
    }, [gameState.currentPlayer, gameState.gameOver, gameMode, screen]);

    const handleCategoryChange = (player, category) => {
        if (player === 'player1') {
            setPlayer1Category(category);
        } else {
            setPlayer2Category(category);
        }
    };

    const handleModeChange = (mode) => {
        setGameMode(mode);
    };

    const startGame = () => {
        setGameState({
            board: Array(9).fill(null),
            currentPlayer: 1,
            player1Emojis: [],
            player2Emojis: [],
            player1Positions: [],
            player2Positions: [],
            gameOver: false,
            scores: gameState.scores,
            winner: null,
            isDraw: false
        });
        setScreen('game');
    };

    const makeAIMove = () => {
        if (gameState.gameOver || isAIMoving || gameState.currentPlayer !== 2) {
            return;
        }

        setIsAIMoving(true);

        // Get empty cells
        const emptyCells = gameState.board
            .map((cell, index) => (cell === null ? index : null))
            .filter((index) => index !== null);

        if (emptyCells.length === 0) {
            setIsAIMoving(false);
            return;
        }

        let moveIndex = null;

        // 1. Check for AI winning move
        for (const index of emptyCells) {
            const tempBoard = [...gameState.board];
            tempBoard[index] = {
                emoji: getRandomEmoji(player2Category),
                player: 2,
                isWinning: false
            };
            if (checkWinForPlayer(tempBoard, 2)) {
                moveIndex = index;
                break;
            }
        }

        // 2. Check for blocking player's winning move
        if (moveIndex === null) {
            for (const index of emptyCells) {
                const tempBoard = [...gameState.board];
                tempBoard[index] = {
                    emoji: getRandomEmoji(player1Category),
                    player: 1,
                    isWinning: false
                };
                if (checkWinForPlayer(tempBoard, 1)) {
                    moveIndex = index;
                    break;
                }
            }
        }

        // 3. Prioritize center (4) or corners (0, 2, 6, 8)
        if (moveIndex === null) {
            const strategicMoves = [4, 0, 2, 6, 8].filter((i) => emptyCells.includes(i));
            if (strategicMoves.length > 0) {
                moveIndex = strategicMoves[0];
            } else {
                // Random move as fallback
                const randomIndex = Math.floor(Math.random() * emptyCells.length);
                moveIndex = emptyCells[randomIndex];
            }
        }

        // Execute AI move with delay for natural feel
        setTimeout(() => {
            makeMove(moveIndex, 2);
            setIsAIMoving(false);
        }, 500);
    };

    const makeMove = (index, player) => {
        if (gameState.gameOver || gameState.board[index] !== null) {
            return;
        }

        const category = player === 1 ? player1Category : player2Category;
        const randomEmoji = getRandomEmoji(category);

        // Deep copy board to ensure immutability
        const newBoard = gameState.board.map((cell) =>
            cell ? { ...cell } : null
        );
        let newPlayer1Emojis = [...gameState.player1Emojis];
        let newPlayer2Emojis = [...gameState.player2Emojis];
        let newPlayer1Positions = [...gameState.player1Positions];
        let newPlayer2Positions = [...gameState.player2Positions];

        // Handle emoji limit (max 3 per player)
        if (player === 1 && newPlayer1Emojis.length >= 3) {
            const oldestPosition = newPlayer1Positions[0];
            if (index === oldestPosition) return; // Prevent replacing same position
            newBoard[oldestPosition] = null;
            newPlayer1Emojis.shift();
            newPlayer1Positions.shift();
        } else if (player === 2 && newPlayer2Emojis.length >= 3) {
            const oldestPosition = newPlayer2Positions[0];
            if (index === oldestPosition) return;
            newBoard[oldestPosition] = null;
            newPlayer2Emojis.shift();
            newPlayer2Positions.shift();
        }

        // Place new emoji
        newBoard[index] = {
            emoji: randomEmoji,
            player: player,
            isWinning: false
        };

        // Update player arrays
        if (player === 1) {
            newPlayer1Emojis.push(randomEmoji);
            newPlayer1Positions.push(index);
        } else {
            newPlayer2Emojis.push(randomEmoji);
            newPlayer2Positions.push(index);
        }

        // Check for win or draw
        const winner = checkWinForPlayer(newBoard, player);
        let newScores = [...gameState.scores];
        let gameOver = false;
        let isDraw = false;

        if (winner) {
            const winningCombination = getWinningCombination(newBoard, player);
            winningCombination.forEach((i) => {
                newBoard[i] = { ...newBoard[i], isWinning: true };
            });
            newScores[player - 1] += 1;
            gameOver = true;
        } else if (newBoard.every((cell) => cell !== null)) {
            isDraw = true;
            gameOver = true;
        }

        // Update game state
        const updatedGameState = {
            board: newBoard,
            currentPlayer: player === 1 ? 2 : 1,
            player1Emojis: newPlayer1Emojis,
            player2Emojis: newPlayer2Emojis,
            player1Positions: newPlayer1Positions,
            player2Positions: newPlayer2Positions,
            gameOver,
            scores: newScores,
            winner: winner ? player : null,
            isDraw
        };

        setGameState(updatedGameState);

        // Handle game over
        if (gameOver) {
            setTimeout(() => {
                setScreen('win');
            }, 100);
        }
    };

    const handleCellClick = (index) => {
        // Prevent clicks during AI move, if game is over, or cell is occupied
        if (gameState.gameOver || 
            gameState.board[index] !== null || 
            isAIMoving || 
            (gameMode === 'ai' && gameState.currentPlayer === 2)) {
            return;
        }

        makeMove(index, gameState.currentPlayer);
    };

    const restartGame = () => {
        setIsAIMoving(false);
        setGameState({
            board: Array(9).fill(null),
            currentPlayer: 1,
            player1Emojis: [],
            player2Emojis: [],
            player1Positions: [],
            player2Positions: [],
            gameOver: false,
            scores: gameState.scores,
            winner: null,
            isDraw: false
        });
        setScreen('game');
    };

    const newGame = () => {
        setIsAIMoving(false);
        setGameState({
            board: Array(9).fill(null),
            currentPlayer: 1,
            player1Emojis: [],
            player2Emojis: [],
            player1Positions: [],
            player2Positions: [],
            gameOver: false,
            scores: [0, 0],
            winner: null,
            isDraw: false
        });
        setScreen('setup');
    };

    const playAgain = () => {
        restartGame();
    };

    return (
        <div className="container">
            <h1>Blink Tac Toe</h1>

            {screen === 'setup' && (
                <SetupScreen
                    player1Category={player1Category}
                    player2Category={player2Category}
                    gameMode={gameMode}
                    onCategoryChange={handleCategoryChange}
                    onModeChange={handleModeChange}
                    onStartGame={startGame}
                    onShowHelp={() => setShowHelp(true)}
                />
            )}

            {screen === 'game' && (
                <GameScreen
                    currentPlayer={gameState.currentPlayer}
                    board={gameState.board}
                    scores={gameState.scores}
                    onCellClick={handleCellClick}
                    onRestart={restartGame}
                    onNewGame={newGame}
                    isAIMoving={isAIMoving}
                />
            )}

            {screen === 'win' && (
                <WinScreen
                    winner={gameState.winner}
                    isDraw={gameState.isDraw}
                    onPlayAgain={playAgain}
                />
            )}

            {showHelp && (
                <HelpModal onClose={() => setShowHelp(false)} />
            )}
        </div>
    );
};

export default App;