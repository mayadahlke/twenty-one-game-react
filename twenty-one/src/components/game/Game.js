import React, { useState, useEffect } from "react";
import Ace from "../ace/Ace";
import Hand from "../hand/Hand";
import {
    dealRandomCard,
    dealTwoCardsPerPlayer,
    calculatePlayerScore,
    calculateDealerScore,
    calculateFinal,
    checkForBust,
    revealHand,
} from "../../util/helpers";
import { deck } from "../../util/deck";

export const Player = {
    PLAYER: "Player",
    DEALER: "Dealer",
};

export const GameOption = {
    HIT: "Hit",
    STAND: "Stand",
};

export default function Game() {
    /*************************** useState *****************************/
    const [remainingDeck, setRemainingDeck] = useState(deck);
    const [final, setFinal] = useState("");

    const [numberOfAces, setNumberOfAces] = useState(0);
    const [playerCards, setPlayerCards] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [playerPlay, setPlayerPlay] = useState("--");

    const [dealerCards, setDealerCards] = useState([]);
    const [dealerScore, setDealerScore] = useState(0);
    const [dealerPlay, setDealerPlay] = useState("--");

    /************************* helper functions ************************/
    function getRandomCard(deck) {
        const [randomCard, remainingCards] = dealRandomCard(deck);
        setRemainingDeck(remainingCards);
        return randomCard;
    }

    function dealTwoCards(deck) {
        const [
            playerCard1,
            playerCard2,
            dealerCard1,
            dealerCard2,
            updatedDeck,
        ] = dealTwoCardsPerPlayer(deck);

        // Update the player's score and cards, check if they have aces though
        const [score, acesCount] = calculatePlayerScore(
            playerCard1,
            playerCard2
        );
        setNumberOfAces(acesCount);
        setPlayerCards([playerCard1, playerCard2]);
        setPlayerScore(score);

        // Update the dealer's score and cards
        dealerCard2.hidden = true;
        setDealerCards([dealerCard1, dealerCard2]);
        setDealerScore(calculateDealerScore([dealerCard1, dealerCard2]));

        // Update the remaining deck
        setRemainingDeck(updatedDeck);
    }

    function hit() {
        const card = getRandomCard(remainingDeck);

        if (card.name === "A") {
            setNumberOfAces(1);
        } else {
            setPlayerScore(playerScore + card.value[0]);
        }

        setPlayerCards([...playerCards, card]);
        setPlayerPlay(GameOption.HIT);
    }

    function stand() {
        setPlayerPlay(GameOption.STAND);

        // If 16 or less, dealer must hit
        // If 17 or more, dealer must stand
        let dCards = dealerCards;
        if (dealerScore <= 16) {
            const card = getRandomCard(remainingDeck);
            dCards = [...dealerCards, card];
            setDealerPlay(GameOption.HIT);
        } else if (dealerScore >= 17) {
            setDealerPlay(GameOption.STAND);
        }
        const dScore = calculateDealerScore(dCards);
        setDealerScore(dScore);
        setDealerCards(revealHand(dCards));

        // Calculate the final result
        setFinal(calculateFinal(playerScore, dScore));
    }

    function setCardScore(value) {
        setPlayerScore(playerScore + value);
        setNumberOfAces(numberOfAces - 1);
    }

    function resetGame() {
        // Reset the state
        setFinal("");
        setNumberOfAces(0);
        setPlayerPlay("--");
        setDealerPlay("--");

        // Deal two new cards
        const resetDeck = revealHand(deck);
        dealTwoCards(resetDeck);
    }

    /*************************** useEffect *****************************/
    useEffect(() => {
        dealTwoCards(remainingDeck);
    }, []);

    useEffect(() => {
        const final = checkForBust(playerScore, dealerScore);
        if (final) {
            setFinal(final);
            setDealerCards(revealHand(dealerCards));
        }
    }, [playerScore, dealerScore]);

    /*************************** render *****************************/
    return (
        <>
            <div className="flex justify-between items-center gap-4 bg-[#C7A170] rounded m-10 h-1/2">
                <Hand
                    cards={dealerCards}
                    player={Player.DEALER}
                    play={dealerPlay}
                    score={final ? dealerScore : "--"}
                />

                <div className="flex flex-col justify-center items-center gap-3 w-[142px]">
                    <button
                        className="action-btn"
                        onClick={hit}
                        disabled={final || numberOfAces > 0}
                    >
                        Hit
                    </button>

                    <button
                        className="action-btn"
                        onClick={stand}
                        disabled={final || numberOfAces > 0}
                    >
                        Stand
                    </button>

                    <button className="action-btn" onClick={resetGame}>
                        Reset
                    </button>
                </div>

                <Hand
                    cards={playerCards}
                    player={Player.PLAYER}
                    play={playerPlay}
                    score={playerScore}
                />
            </div>

            {Array.from({ length: numberOfAces }, (_, index) => (
                <span key={index}>
                    <Ace setCardScore={setCardScore} />
                </span>
            ))}

            <div className="text-4xl text-center" data-testid="final">
                {final}
            </div>
        </>
    );
}
