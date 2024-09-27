import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import Card from "./components/Card";
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
    const [currentCard, setCurrentCard] = useState({});
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

            setDealerScore(dealerScore + card.value);
            setDealerCards([...dealerCards, card]);
            setDealerPlay(gameOptions.hit);
        }

        setIsDealerTurn(false);
    }

    function selectCard() {
        const card = getRandomCard();

        setScore(score + card.value);
        setCurrentCard(card);
        setCards([...cards, card]);
        setPlay(gameOptions.hit);
        setIsDealerTurn(true);
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
        setCurrentCard({});
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
                Tap the card in the middle to start the game.<br></br>The goal
                is to get your score as close to 21 as possible without going
                over and beat the dealer's score. Click 'Stand' to end your
                turn. Good luck!
            </p>

            <div className="flex justify-between items-center gap-4 bg-[#C7A170] rounded m-10 h-1/2">
                <div className="flex flex-col items-center h-full p-3 grow">
                    <Hand
                        cards={dealerCards}
                        player="Dealer"
                        play={dealerPlay}
                        score={reveal ? dealerScore : "--"}
                        hidden={!reveal}
                    />
                </div>

                <div className="flex justify-center items-center gap-3 w-[142px]">
                    <button
                        className="cursor-pointer"
                        onClick={() => {
                            selectCard();
                            setTimeout(() => {
                                if (!reveal) {
                                    dealerSelectCard();
                                }
                            }, 500);
                        }}
                        disabled={reveal || isDealerTurn}
                    >
                        <Card
                            card={{}}
                            hidden={true}
                            isHitCard={true}
                            disabled={reveal || isDealerTurn}
                        />
                    </button>

                    {Object.keys(currentCard).length > 0 && (
                        <Card card={currentCard} />
                    )}
                </div>

                <div className="flex flex-col items-center h-full p-3 grow">
                    <Hand
                        cards={cards}
                        player="Player"
                        play={play}
                        score={score}
                    />
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
