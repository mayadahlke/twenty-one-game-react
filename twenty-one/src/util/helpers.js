export const GameResult = {
    WIN: "You win! 🎉",
    LOSE: "You lose! 😔",
    PUSH: "Push! 🤝",
    BUST: "Bust! 😬",
};

/**
 * @param {Array} remainingDeck - The deck of cards that are still available to be drawn
 * @returns {Array} - A random card and the remaining deck of cards
 */
export function dealRandomCard(remainingDeck) {
    const randomIndex = Math.floor(Math.random() * remainingDeck.length);
    const randomCard = remainingDeck[randomIndex];
    const remainingCards = [...remainingDeck].filter(
        (card) => card.id !== randomCard.id
    );
    return [randomCard, remainingCards];
}

/**
 * @param {Array} remainingDeck - The deck of cards that are still available to be drawn
 * @returns {Array} - A random card and the remaining deck of cards
 */
export function dealTwoCardsPerPlayer(remainingDeck) {
    const [playerCard1, updatedDeck1] = dealRandomCard(remainingDeck);
    const [playerCard2, updatedDeck2] = dealRandomCard(updatedDeck1);
    const [dealerCard1, updatedDeck3] = dealRandomCard(updatedDeck2);
    const [dealerCard2, updatedDeck4] = dealRandomCard(updatedDeck3);

    return [[playerCard1, playerCard2, dealerCard1, dealerCard2], updatedDeck4];
}

/**
 * @param {number} playerScore - The player's current score
 * @param {number} dealerScore - The dealer's current score
 * @returns {string} - The result of the game
 */
export function calculateFinal(playerScore, dealerScore) {
    if (playerScore === dealerScore) {
        return GameResult.PUSH;
    } else if (playerScore > dealerScore) {
        return GameResult.WIN;
    } else {
        return GameResult.LOSE;
    }
}

/**
 * @param {number} playerScore - The player's current score
 * @param {number} dealerScore - The dealer's current score
 * @returns {Array} - A boolean indicating if the game is over and the final result
 */
export function checkForBust(playerScore, dealerScore) {
    let reveal = false;
    let final = "";
    if (playerScore > 21 && dealerScore > 21) {
        final = GameResult.PUSH;
        reveal = true;
    } else if (playerScore <= 21 && dealerScore > 21) {
        final = GameResult.WIN;
        reveal = true;
    } else if (playerScore > 21 && dealerScore <= 21) {
        final = GameResult.BUST;
        reveal = true;
    }
    return [reveal, final];
}
