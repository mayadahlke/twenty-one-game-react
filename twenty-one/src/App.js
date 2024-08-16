import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import Card from "./components/Card";
import { deck } from "./deck";

export default function App() {
    /*************************** useMemo *****************************/
    const gameFinaleOptions = useMemo(
        () => ({
            win: "You win! 🎉",
            lose: "You lose! 😔",
            draw: "Draw! 🤝",
            bust: "Bust!",
        }),
        []
    );

    /*************************** useState *****************************/
    const [remainingDeck, setRemainingDeck] = useState(deck);
    const [reveal, setReveal] = useState(false);
    const [final, setFinal] = useState("");

    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState({});
    const [score, setScore] = useState(0);

    const [opponentCards, setOpponentCards] = useState([]);
    const [opponentScore, setOpponentScore] = useState(0);

    /************************* helper functions ************************/
    function selectCard() {
        const randomIndex = Math.floor(Math.random() * remainingDeck.length);
        const randomCard = remainingDeck[randomIndex];
        const remainingCards = [...remainingDeck].filter(
            (card) => card.id !== randomCard.id
        );

        setScore(score + randomCard.value);
        setCurrentCard(randomCard);
        setCards([...cards, randomCard]);

        const randomIndexForOpponent = Math.floor(
            Math.random() * remainingCards.length
        );
        const randomCardForOpponent = remainingCards[randomIndexForOpponent];

        setOpponentScore(opponentScore + randomCardForOpponent.value);
        setOpponentCards([...opponentCards, randomCardForOpponent]);
        setRemainingDeck(
            remainingCards.filter(
                (card) => card.id !== randomCardForOpponent.id
            )
        );
    }

    function revealGame() {
        debugger;
        if (score > 21) {
            setFinal(gameFinaleOptions.bust);
        } else if (opponentScore > 21) {
            setFinal(gameFinaleOptions.win);
        } else if (opponentScore === score) {
            setFinal(gameFinaleOptions.draw);
        } else if (opponentScore > score) {
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

        setCards([]);
        setCurrentCard({});
        setScore(0);

        setOpponentCards([]);
        setOpponentScore(0);
    }

    /*************************** useEffect *****************************/
    useEffect(() => {
        if (score > 21) {
            setFinal(gameFinaleOptions.bust);
            setReveal(true);
        }

        if (score === 21) {
            setFinal(gameFinaleOptions.win);
            setReveal(true);
        }

        if (opponentScore === 21) {
            setFinal(gameFinaleOptions.lose);
            setReveal(true);
        }
    }, [score, opponentScore, gameFinaleOptions]);

    /*************************** render *****************************/
    return (
        <div className="h-screen bg-[#98774E]">
            <p className="text-5xl text-center pt-10">Twenty One</p>
            <p className="text-2xl text-center">
                Tap the card in the middle to start the game.<br></br>The goal
                is to get your score as close to 21 as possible without going
                over and beat the opponent's score. Click 'Stand' to end your
                turn. Good luck!
            </p>

            <div className="flex justify-between items-center gap-4 bg-[#C7A170] rounded m-10 h-1/2">
                <div className="flex flex-col items-center h-full p-3 grow">
                    <div className="text-2xl">Opponent</div>
                    <div className="text-2xl">
                        Opponent Score: {reveal ? opponentScore : "--"}
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-3 grow mb-[52px]">
                        {opponentCards.map((card) => (
                            <Card key={card.id} card={card} hidden={!reveal} />
                        ))}
                    </div>
                </div>

                <div className="flex justify-center items-center gap-3 w-[142px]">
                    <button
                        className="cursor-pointer"
                        onClick={selectCard}
                        disabled={reveal}
                    >
                        <Card card={{}} hidden={true} />
                    </button>

                    {Object.keys(currentCard).length > 0 && (
                        <Card card={currentCard} />
                    )}
                </div>

                <div className="flex flex-col items-center h-full p-3 grow">
                    <div className="text-2xl">You</div>
                    <div className="text-2xl">Score: {score}</div>
                    <div className="flex flex-wrap justify-center items-center gap-3 grow">
                        {cards.map((card) => (
                            <Card key={card.id} card={card} />
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            className="action-btn"
                            onClick={revealGame}
                            disabled={reveal}
                        >
                            Stand
                        </button>
                        <button className="action-btn" onClick={resetGame}>
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            <div className="text-4xl text-center">{final}</div>
        </div>
    );
}
