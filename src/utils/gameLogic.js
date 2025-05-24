// Emoji categories
export const emojiCategories = {
    animals: ['🐶', '🐱', '🐵', '🐰'],
    food: ['🍕', '🍟', '🍔', '🍩'],
    sports: ['⚽️', '🏀', '🏈', '🎾']
};

// Emoji index tracker for each category (for sequential selection)
const emojiIndexes = {
    animals: 0,
    food: 0,
    sports: 0
};

// Sequential (not random) emoji selection function
export const getRandomEmoji = (category) => {
    const emojis = emojiCategories[category];
    const index = emojiIndexes[category];

    const emoji = emojis[index];
    
    // Move to next index, loop back if at the end
    emojiIndexes[category] = (index + 1) % emojis.length;

    return emoji;
};

// Tic Tac Toe win patterns
export const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

// Check if a player has won
export const checkWinForPlayer = (board, player) => {
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return board[index] !== null && board[index].player === player;
        });
    });
};

// Return the winning combination if any
export const getWinningCombination = (board, player) => {
    for (const pattern of winPatterns) {
        if (pattern.every(index => {
            return board[index] !== null && board[index].player === player;
        })) {
            return pattern;
        }
    }
    return [];
};

// Optional: Reset emoji indexes (use this if needed on game restart)
export const resetEmojiIndexes = () => {
    Object.keys(emojiIndexes).forEach(category => {
        emojiIndexes[category] = 0;
    });
};
