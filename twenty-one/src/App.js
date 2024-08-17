import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import Card from "./components/Card";
import { deck } from "./deck";

export default function App() {
    /*************************** useMemo *****************************/
    const gameOptions = useMemo(() => ({ hit: "Hit", stand: "Stand" }), []);

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
    const [isOpponentTurn, setIsOpponentTurn] = useState(false);

    const [cards, setCards] = useState([]);
    const [currentCard, setCurrentCard] = useState({});
    const [score, setScore] = useState(0);
    const [play, setPlay] = useState("--");

    const [opponentCards, setOpponentCards] = useState([]);
    const [opponentScore, setOpponentScore] = useState(0);
    const [opponentPlay, setOpponentPlay] = useState("--");

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

    function opponentSelectCard() {
        if (opponentScore >= 17) {
            setOpponentPlay(gameOptions.stand);
        } else {
            const card = getRandomCard();

            setOpponentScore(opponentScore + card.value);
            setOpponentCards([...opponentCards, card]);
            setOpponentPlay(gameOptions.hit);
        }

        setIsOpponentTurn(false);
    }

    function selectCard() {
        const card = getRandomCard();

        setScore(score + card.value);
        setCurrentCard(card);
        setCards([...cards, card]);
        setPlay(gameOptions.hit);
        setIsOpponentTurn(true);
    }

    function revealGame() {
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
        setIsOpponentTurn(false);

        setCards([]);
        setCurrentCard({});
        setScore(0);
        setPlay("--");

        setOpponentCards([]);
        setOpponentScore(0);
        setOpponentPlay("--");
    }

    /*************************** useEffect *****************************/
    useEffect(() => {
        if (score > 21) {
            setFinal(gameFinaleOptions.bust);
            setReveal(true);
        }

        if (opponentScore > 21) {
            setFinal(gameFinaleOptions.win);
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
                    <div className="text-2xl">Opponent: {opponentPlay}</div>
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
                        onClick={() => {
                            selectCard();
                            setTimeout(() => {
                                if (!reveal) {
                                    opponentSelectCard();
                                }
                            }, 500);
                        }}
                        disabled={reveal || isOpponentTurn}
                    >
                        <Card
                            card={{}}
                            hidden={true}
                            isHitCard={true}
                            disabled={reveal || isOpponentTurn}
                        />
                    </button>

                    {Object.keys(currentCard).length > 0 && (
                        <Card card={currentCard} />
                    )}
                </div>

                <div className="flex flex-col items-center h-full p-3 grow">
                    <div className="text-2xl">Player: {play}</div>
                    <div className="text-2xl">Score: {score}</div>
                    <div className="flex flex-wrap justify-center items-center gap-3 grow">
                        {cards.map((card) => (
                            <Card key={card.id} card={card} />
                        ))}
                    </div>
                    <div className="flex items-center gap-3">
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
                </div>
            </div>

            <div className="text-4xl text-center">{final}</div>
        </div>
    );
}
