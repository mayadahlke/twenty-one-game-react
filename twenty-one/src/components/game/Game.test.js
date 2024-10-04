import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import Game from "./Game";

describe("Game", () => {
    afterEach(() => {
        cleanup();
    });

    test("dealer and player should start with two cards", () => {
        render(<Game />);

        // Check if the dealer has two cards
        const dealerCards = screen.getByTestId("dealer-cards");
        expect(dealerCards.childElementCount).toBe(2);

        // Check if the player has two cards
        const playerCards = screen.getByTestId("player-cards");
        expect(playerCards.childElementCount).toBe(2);
    });

    test("should give player another card when 'HIT' is clicked", () => {
        render(<Game />);

        // Click the 'HIT' button
        const hitButton = screen.getByRole("button", { name: "Hit" });
        expect(hitButton).toBeTruthy();
        fireEvent.click(hitButton);

        // Check if the player has three cards
        const playerCards = screen.getByTestId("player-cards");
        expect(playerCards.childElementCount).toBe(3);
    });

    test("should reveal information when 'STAND' is clicked", () => {
        render(<Game />);

        // Click the 'STAND' button
        const standButton = screen.getByRole("button", { name: "Stand" });
        expect(standButton).toBeTruthy();
        fireEvent.click(standButton);

        // Check if the player's cards are still 2
        const playerCards = screen.getByTestId("player-cards");
        expect(playerCards.childElementCount).toBe(2);

        // Check if final is showing
        const final = screen.queryByTestId("final");
        expect(final).toBeTruthy();
        expect(final.textContent).not.toEqual("");

        // Check 'STAND' button is disabled
        expect(standButton.hasAttribute("disabled")).toBeTruthy();

        // Check 'HIT' button is disabled
        const hitButton = screen.getByRole("button", { name: "Hit" });
        expect(hitButton.hasAttribute("disabled")).toBeTruthy();
    });

    test("should reveal dealer's cards when 'STAND' is clicked", () => {
        render(<Game />);

        // Click the 'STAND' button
        const standButton = screen.getByRole("button", { name: "Stand" });
        expect(standButton).toBeTruthy();
        fireEvent.click(standButton);

        // Check if the dealer's cards are not hidden
        const dealerCards = screen.getByTestId("dealer-cards");
        for (let i = 0; i < dealerCards.children.length; i++) {
            const cardElement = dealerCards.children[i];
            const cardImage = cardElement.children[0];
            expect(cardImage.classList.contains("border-double")).toBeFalsy();
        }
    });

    test("should enable buttons when 'RESET' is clicked", () => {
        render(<Game />);

        // Click the 'STAND' button
        const standButton = screen.getByRole("button", { name: "Stand" });
        expect(standButton).toBeTruthy();
        fireEvent.click(standButton);

        // Click the 'RESET' button
        const resetButton = screen.getByRole("button", { name: "Reset" });
        expect(resetButton).toBeTruthy();
        fireEvent.click(resetButton);

        // Check 'STAND' button is not disabled
        expect(standButton.hasAttribute("disabled")).toBeFalsy();

        // Check 'HIT' button is not disabled
        const hitButton = screen.getByRole("button", { name: "Hit" });
        expect(hitButton.hasAttribute("disabled")).toBeFalsy();
    });

    test("should show the final result when the game is over", () => {
        render(<Game />);

        // Check that the final result has empty string content
        const final = screen.queryByTestId("final");
        expect(final).toBeTruthy(); 
        expect(final.textContent).toEqual("");

        // Click the 'STAND' button
        const standButton = screen.getByRole("button", { name: "Stand" });
        expect(standButton).toBeTruthy();
        fireEvent.click(standButton);

        // Check if the final result doesn't have empty string content
        expect(final.textContent).not.toEqual("");
    });
});
