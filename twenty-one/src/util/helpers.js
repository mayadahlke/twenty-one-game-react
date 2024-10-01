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
 * @param {Array} playerCards - The player's current hand
 * @returns {Array} - The player's score and the number of aces in their hand
 */
export function calculatePlayerScore(card1, card2) {
    const acesCount =
        (card1.name === "A" ? 1 : 0) + (card2.name === "A" ? 1 : 0);

    let score = 0;
    if (acesCount === 2) {
        score = 0;
    } else if (acesCount === 1) {
        score = card1.name === "A" ? card2.value[0] : card1.value[0];
    } else {
        score = card1.value[0] + card2.value[0];
    }

    return [score, acesCount];
}

/**
 * @param {number} playerScore - The player's current score
 * @param {number} dealerScore - The dealer's current score
 * @returns {string} - The result of the game
 */
export function calculateFinal(playerScore, dealerScore) {
    // player not bust & dealer not bust = compare scores

    if (playerScore === dealerScore) {
        return GameResult.PUSH;
    } else if (playerScore > dealerScore) {
        return GameResult.WIN;
    } else {
        return GameResult.LOSE;
    }
}

/**
* @param {Array} hand - The hand to reveal
* @returns {Array} - The revealed hand
*/
export function revealHand(hand) {
    hand.forEach((card) => {
        card.hidden = false;
    });
    return hand;
}

/**
 * @param {number} playerScore - The player's current score
 * @param {number} dealerScore - The dealer's current score
 * @returns {Array} - A boolean indicating if the game is over and the final result
 */
export function checkForBust(playerScore, dealerScore) {
    // player bust & dealer bust = push
    // player not bust & dealer bust = win
    // player bust & dealer not bust = bust

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
