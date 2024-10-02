import React from "react";
import "./App.css";
import Game from "./components/game/Game";

export default function App() {
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

            <Game />
        </div>
    );
}
