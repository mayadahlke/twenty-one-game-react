import React, { useState, useEffect } from "react";
import Ace from "../ace/Ace";
import Hand from "../hand/Hand";
import {
    dealRandomCard,
    dealTwoCardsPerPlayer,
    calculateFinal,
    checkForBust,
} from "../../util/helpers";
import { deck } from "../../deck";

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
    const [reveal, setReveal] = useState(false);
    const [final, setFinal] = useState("");
    const [isDealerTurn, setIsDealerTurn] = useState(false);

    const [numberOfAces, setNumberOfAces] = useState(0);
    const [playerCards, setPlayerCards] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [playerPlay, setPlayerPlay] = useState("--");

    const [dealerCards, setDealerCards] = useState([]);
    const [dealerScore, setDealerScore] = useState(0);
    const [dealerPlay, setDealerPlay] = useState("--");

    /************************* helper functions ************************/
    function getRandomCard() {
        const [randomCard, remainingCards] = dealRandomCard(remainingDeck);
        setRemainingDeck(remainingCards);
        return randomCard;
    }

    function dealTwoCards() {
        const [
            [playerCard1, playerCard2, dealerCard1, dealerCard2],
            updatedDeck,
        ] = dealTwoCardsPerPlayer(remainingDeck);

        // Update the player's score and cards, check if they have aces though
        let acesCount =
            (playerCard1.name === "A" ? 1 : 0) +
            (playerCard2.name === "A" ? 1 : 0);
        setNumberOfAces(acesCount);

        if (acesCount === 2) {
            setPlayerScore(0);
        } else if (acesCount === 1) {
            setPlayerScore(
                playerCard1.name === "A"
                    ? playerCard2.value[0]
                    : playerCard1.value[0]
            );
        } else {
            setPlayerScore(playerCard1.value[0] + playerCard2.value[0]);
        }
        setPlayerCards([playerCard1, playerCard2]);

        // Update the dealer's score and cards
        setDealerScore(dealerCard1.value[0] + dealerCard2.value[0]);
        setDealerCards([dealerCard1, dealerCard2]);

        // Update the remaining deck
        setRemainingDeck(updatedDeck);
    }

    function dealerSelectCard() {
        if (dealerScore >= 17) {
            setDealerPlay(GameOption.STAND);
        } else {
            const card = getRandomCard();

            setDealerScore(dealerScore + card.value[0]);
            setDealerCards([...dealerCards, card]);
            setDealerPlay(GameOption.HIT);
        }

        setIsDealerTurn(false);
    }

    function selectCard() {
        const card = getRandomCard();

        if (card.name === "A") {
            setNumberOfAces(1);
        } else {
            setPlayerScore(playerScore + card.value[0]);
        }

        setIsDealerTurn(true);
        dealerSelectCard();
        setPlayerCards([...playerCards, card]);
        setPlayerPlay(GameOption.HIT);
    }

    function setCardScore(value) {
        setPlayerScore(playerScore + value);
        setNumberOfAces(numberOfAces - 1);
    }

    function revealGame() {
        setPlayerPlay(GameOption.STAND);

        // player not bust & dealer not bust = compare scores
        const final = calculateFinal(playerScore, dealerScore);
        setFinal(final);
        setReveal(true);
    }

    function resetGame() {
        setRemainingDeck(deck);
        setReveal(false);
        setFinal("");
        setIsDealerTurn(false);
        setNumberOfAces(0);
        setPlayerPlay("--");
        setDealerPlay("--");

        dealTwoCards();
    }

    /*************************** useEffect *****************************/
    useEffect(() => {
        dealTwoCards();
    }, []);

    useEffect(() => {
        // player bust & dealer bust = push
        // player not bust & dealer bust = win
        // player bust & dealer not bust = bust

        const [reveal, final] = checkForBust(playerScore, dealerScore);
        setReveal(reveal);
        setFinal(final);
    }, [playerScore, dealerScore]);

    /*************************** render *****************************/
    return (
        <>
            <div className="flex justify-between items-center gap-4 bg-[#C7A170] rounded m-10 h-1/2">
                <Hand
                    cards={dealerCards}
                    player={Player.DEALER}
                    play={dealerPlay}
                    score={reveal ? dealerScore : "--"}
                    hidden={!reveal}
                />

                <div className="flex flex-col justify-center items-center gap-3 w-[142px]">
                    <button
                        className="action-btn"
                        onClick={selectCard}
                        disabled={reveal || isDealerTurn || numberOfAces > 0}
                    >
                        Hit
                    </button>

                    <button
                        className="action-btn"
                        onClick={revealGame}
                        disabled={reveal || numberOfAces > 0}
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
