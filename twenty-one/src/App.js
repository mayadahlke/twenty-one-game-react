import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import Ace from "./components/Ace";
import Hand from "./components/Hand";
import { deck } from "./deck";

export const Player = {
    PLAYER: "Player",
    DEALER: "Dealer",
};

export const GameOption = {
    HIT: "Hit",
    STAND: "Stand",
};

export default function App() {
    /*************************** useMemo *****************************/
    const gameFinaleOptions = useMemo(
        () => ({
            win: "You win! 🎉",
            lose: "You lose! 😔",
            push: "Push! 🤝",
            bust: "Bust! 😬",
        }),
        []
    );

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
        const randomIndex = Math.floor(Math.random() * remainingDeck.length);
        const randomCard = remainingDeck[randomIndex];
        const remainingCards = [...remainingDeck].filter(
            (card) => card.id !== randomCard.id
        );

        setRemainingDeck(remainingCards);

        return randomCard;
    }

    function dealTwoCards() {
        const card1 = getRandomCard();
        const card2 = getRandomCard();

        // Check the number of aces the player gets
        let acesCount =
            (card1.name === "A" ? 1 : 0) + (card2.name === "A" ? 1 : 0);
        setNumberOfAces(acesCount);

        if (acesCount === 2) {
            setPlayerScore(0); // If the player gets two aces, set the score to 0 (they'll choose value)
        } else if (acesCount === 1) {
            setPlayerScore(
                card1.name === "A" ? card2.value[0] : card1.value[0]
            ); // If the player gets one ace, set the score to the other card's value
        } else {
            setPlayerScore(card1.value[0] + card2.value[0]);
        }
        setPlayerCards([card1, card2]);

        const dealerCard1 = getRandomCard();
        const dealerCard2 = getRandomCard();

        setDealerScore(dealerCard1.value[0] + dealerCard2.value[0]);
        setDealerCards([dealerCard1, dealerCard2]);
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
        // player not bust & dealer not bust = compare scores

        if (playerScore === dealerScore) {
            setFinal(gameFinaleOptions.push);
        } else if (playerScore > dealerScore) {
            setFinal(gameFinaleOptions.win);
        } else {
            setFinal(gameFinaleOptions.lose);
        }

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

        if (playerScore > 21 && dealerScore > 21) {
            setFinal(gameFinaleOptions.push);
            setReveal(true);
        } else if (playerScore <= 21 && dealerScore > 21) {
            setFinal(gameFinaleOptions.win);
            setReveal(true);
        } else if (playerScore > 21 && dealerScore <= 21) {
            setFinal(gameFinaleOptions.bust);
            setReveal(true);
        }
    }, [playerScore, dealerScore, gameFinaleOptions]);

    /*************************** render *****************************/
    return (
        <div className="h-screen bg-[#98774E]">
            <p className="text-5xl text-center pt-10">Twenty One</p>
            <p className="text-2xl text-center">
                The goal of this game is to get your score as close to 21 as
                possible without going over and beat the dealer's score.{" "}
                <br></br>Click 'Hit' to get another card or 'Stand' to keep your
                current hand. Good luck!
            </p>
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
                        onClick={() => {
                            setPlayerPlay(GameOption.STAND);
                            revealGame();
                        }}
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
        </div>
    );
}
