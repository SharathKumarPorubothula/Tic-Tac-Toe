export const emojiCategories = {
    animals: ['🐶', '🐱', '🐵', '🐰'],
    food: ['🍕', '🍟', '🍔', '🍩'],
    sports: ['⚽️', '🏀', '🏈', '🎾']
};

export const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
];

export const getRandomEmoji = (category) => {
    const emojis = emojiCategories[category];
    return emojis[Math.floor(Math.random() * emojis.length)];
};

export const checkWinForPlayer = (board, player) => {
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return board[index] !== null && board[index].player === player;
        });
    });
};

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