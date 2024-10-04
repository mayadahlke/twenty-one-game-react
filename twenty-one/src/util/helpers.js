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
 * @param {Array} deck - The deck of cards that are still available to be drawn
 * @returns {Array} - The player's two cards and the dealer's two cards
 */
export function dealTwoCardsPerPlayer(deck) {
    const [card1, updatedDeck1] = dealRandomCard(deck);
    const [card2, updatedDeck2] = dealRandomCard(updatedDeck1);
    const [card3, updatedDeck3] = dealRandomCard(updatedDeck2);
    const [card4, updatedDeck4] = dealRandomCard(updatedDeck3);

    return [card1, card2, card3, card4, updatedDeck4];
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
 * @param {Array} hand - The dealer's current hand
 * @returns {number} - The dealer's current score
 */
export function calculateDealerScore(hand) {
    let score = 0;
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].name === "A" && score + 11 <= 21) {
            score += 11;
        } else if (hand[i].name === "A" && score + 11 > 21) {
            score += 1;
        } else {
            score += hand[i].value[0];
        }
    }
    return score;
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
 * @returns {Array} - The revealed hand (sets hidden to false)
 */
export function revealHand(hand) {
    return hand.map((card) => {
        return { ...card, hidden: false };
    });
}

/**
 * @param {number} playerScore - The player's current score
 * @param {number} dealerScore - The dealer's current score
 * @returns {string} - The result of the game
 */
export function checkForBust(playerScore, dealerScore) {
    // player bust & dealer bust = push
    // player not bust & dealer bust = win
    // player bust & dealer not bust = bust

    let final = "";
    if (playerScore > 21 && dealerScore > 21) {
        final = GameResult.PUSH;
    } else if (playerScore <= 21 && dealerScore > 21) {
        final = GameResult.WIN;
    } else if (playerScore > 21 && dealerScore <= 21) {
        final = GameResult.BUST;
    }
    return final;
}
