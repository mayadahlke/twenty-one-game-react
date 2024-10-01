import { render, screen } from "@testing-library/react";
import { Player, GameOption } from "../App";
import Hand from "./Hand";

test("should render correct information from props", () => {
    const cards = [{ id: 1, name: "2", value: [2], suit: "♦" }];

    render(
        <Hand
            cards={cards}
            player={Player.PLAYER}
            play={GameOption.HIT}
            score={10}
        />
    );

    // Check if player and play are rendered
    const player = screen.getByText("Player: Hit");
    expect(player).toBeTruthy();

    // Check if the score is rendered
    const score = screen.getByText("Score: 10");
    expect(score).toBeTruthy();
});
