import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import Ace from "./components/Ace";
import Hand from "./components/Hand";
import { deck } from "./deck";

export default function App() {
    /*************************** useMemo *****************************/
    const gameOptions = useMemo(() => ({ hit: "Hit", stand: "Stand" }), []);

    const gameFinaleOptions = useMemo(
        () => ({
            win: "You win! 🎉",
            lose: "You lose! 😔",
            push: "Push! 🤝",
            bust: "Bust!",
        }),
        []
    );

    /*************************** useState *****************************/
    const [remainingDeck, setRemainingDeck] = useState(deck);
    const [reveal, setReveal] = useState(false);
    const [final, setFinal] = useState("");
    const [isDealerTurn, setIsDealerTurn] = useState(false);

    const [cards, setCards] = useState([]);
    const [isAce, setIsAce] = useState(false);
    const [score, setScore] = useState(0);
    const [play, setPlay] = useState("--");

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

    function dealerSelectCard() {
        if (dealerScore >= 17) {
            setDealerPlay(gameOptions.stand);
        } else {
            const card = getRandomCard();

            setDealerScore(dealerScore + card.value[0]);
            setDealerCards([...dealerCards, card]);
            setDealerPlay(gameOptions.hit);
        }

        setIsDealerTurn(false);
    }

    function selectCard() {
        const card = getRandomCard();

        if (card.name === "A") {
            setIsAce(true);
        } else {
            setScore(score + card.value[0]);
            setIsDealerTurn(true);
            dealerSelectCard();
        }

        setCards([...cards, card]);
        setPlay(gameOptions.hit);
    }

    function setCardScore(value) {
        setScore(score + value);
        setIsAce(false);
        setIsDealerTurn(true);
        dealerSelectCard();
    }

    function revealGame() {
        if (score > 21) {
            setFinal(gameFinaleOptions.bust);
        } else if (dealerScore > 21) {
            setFinal(gameFinaleOptions.win);
        } else if (dealerScore === score) {
            setFinal(gameFinaleOptions.draw);
        } else if (dealerScore > score) {
            setFinal(gameFinaleOptions.lose);
        } else {
            setFinal(gameFinaleOptions.win);
        }

        setReveal(true);
    }

    function resetGame() {
        setRemainingDeck(deck);
        setReveal(false);
        setFinal("");
        setIsDealerTurn(false);

        setCards([]);
        setIsAce(false);
        setScore(0);
        setPlay("--");

        setDealerCards([]);
        setDealerScore(0);
        setDealerPlay("--");
    }

    /*************************** useEffect *****************************/
    useEffect(() => {
        if (score > 21) {
            setFinal(gameFinaleOptions.bust);
            setReveal(true);
        }

        if (dealerScore > 21) {
            setFinal(gameFinaleOptions.win);
            setReveal(true);
        }
    }, [score, dealerScore, gameFinaleOptions]);

    /*************************** render *****************************/
    return (
        <div className="h-screen bg-[#98774E]">
            <p className="text-5xl text-center pt-10">Twenty One</p>
            <p className="text-2xl text-center">
                Press 'Hit' in the middle to start the game.<br></br>The goal is
                to get your score as close to 21 as possible without going over
                and beat the dealer's score. Click 'Stand' to end your turn.
                Good luck!
            </p>
            <div className="flex justify-between items-center gap-4 bg-[#C7A170] rounded m-10 h-1/2">
                <Hand
                    cards={dealerCards}
                    player="Dealer"
                    play={dealerPlay}
                    score={reveal ? dealerScore : "--"}
                    hidden={!reveal}
                />

                <div className="flex flex-col justify-center items-center gap-3 w-[142px]">
                    <button
                        className="action-btn"
                        onClick={selectCard}
                        disabled={reveal || isDealerTurn}
                    >
                        Hit
                    </button>

                    <button
                        className="action-btn"
                        onClick={() => {
                            setPlay(gameOptions.stand);
                            revealGame();
                        }}
                        disabled={reveal}
                    >
                        Stand
                    </button>

                    <button className="action-btn" onClick={resetGame}>
                        Reset
                    </button>
                </div>

                <Hand cards={cards} player="Player" play={play} score={score} />
            </div>

            {isAce && <Ace setCardScore={setCardScore} />}

            <div className="text-4xl text-center">{final}</div>
        </div>
    );
}
