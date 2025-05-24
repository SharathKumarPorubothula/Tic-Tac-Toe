import { useEffect } from 'react';
import '../styles/App.css';

const WinScreen = ({ winner, onPlayAgain }) => {
  useEffect(() => {
    createConfetti();
    return () => {
      // Clean up confetti when component unmounts
      const confetti = document.querySelectorAll('.confetti-piece');
      confetti.forEach(el => el.remove());
    };
  }, []);

  const createConfetti = () => {
    const colors = ['#4361ee', '#3a0ca3', '#f72585', '#4cc9f0', '#43e97b'];
    const container = document.querySelector('.win-screen');
    const containerRect = container.getBoundingClientRect();
    
    for (let i = 0; i < 150; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      
      // Random properties
      const size = Math.random() * 10 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const animationDuration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;
      
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = color;
      confetti.style.animationDuration = `${animationDuration}s`;
      confetti.style.animationDelay = `${delay}s`;
      confetti.style.left = `${Math.random() * containerRect.width}px`;
      
      container.appendChild(confetti);
    }
  };

  return (
    <div className="win-screen">
      <div className="win-content">
        <div className="crown-icon">👑</div>
        <h2>Victory!</h2>
        <p className="winner-name">Player {winner} Wins</p>
        <p className="congrats-message">You've conquered the board!</p>
        <button 
          className="btn-glow" 
          onClick={onPlayAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default WinScreen;