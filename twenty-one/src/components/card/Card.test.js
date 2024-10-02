import { render, screen, cleanup } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
    afterEach(cleanup);

    test("should render name and suit for a card", () => {
        const card = { id: 1, name: "2", value: [2], suit: "♦", hidden: false };
        render(<Card card={card} />);

        // Check if the card name is rendered
        const cardName = screen.getAllByText("2");
        expect(cardName).toBeTruthy();
        expect(cardName).toHaveLength(2);

        // Check if the card suit is rendered
        const cardSuit = screen.getByText("♦");
        expect(cardSuit).toBeTruthy();

        // Check the background color of the card
        const cardElement = cardSuit.parentElement;
        expect(cardElement.classList.contains("bg-[#9C2B2B]")).toBeTruthy();
    });

    test("should not render card name and suit for a hidden card", () => {
        const card = { id: 1, name: "2", value: [2], suit: "♦", hidden: true };
        render(<Card card={card} />);

        // Check if the card name is not rendered
        const cardName = screen.queryByText("2");
        expect(cardName).toBeNull();

        // Check if the card suit is not rendered
        const cardSuit = screen.queryByText("♦");
        expect(cardSuit).toBeNull();
    });
});
