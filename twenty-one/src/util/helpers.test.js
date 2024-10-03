import {
    dealRandomCard,
    calculatePlayerScore,
    calculateDealerScore,
    calculateFinal,
    revealHand,
    checkForBust,
    GameResult,
} from "./helpers";

describe("dealRandomCard utility function", () => {
    test("should return last card when 1 is remaining in the deck", () => {
        const card = { id: 1, name: "2", value: [2], suit: "♦" };
        const result = dealRandomCard([card]);
        expect(result).toEqual([card, []]);
    });
});

describe("calculatePlayerScore utility function", () => {
    test("should return correct score and ace count when there are no aces in hand", () => {
        expect(
            calculatePlayerScore(
                { name: "2", value: [2] },
                { name: "3", value: [3] }
            )
        ).toEqual([5, 0]);
    });

    test("should return correct score and ace count when first card is ace", () => {
        expect(
            calculatePlayerScore(
                { name: "A", value: [1, 11] },
                { name: "3", value: [3] }
            )
        ).toEqual([3, 1]);
    });

    test("should return correct score and ace count when second card is ace", () => {
        expect(
            calculatePlayerScore(
                { name: "5", value: [5] },
                { name: "A", value: [1, 11] }
            )
        ).toEqual([5, 1]);
    });

    test("should return correct score and ace count when there are 2 aces in hand", () => {
        expect(
            calculatePlayerScore(
                { name: "A", value: [1, 11] },
                { name: "A", value: [1, 11] }
            )
        ).toEqual([0, 2]);
    });
});

describe("calculateDealerScore utility function", () => {
    test("should return correct score when there are no aces in hand", () => {
        expect(
            calculateDealerScore([
                { name: "2", value: [2] },
                { name: "5", value: [5] },
                { name: "4", value: [4] },
            ])
        ).toEqual(11);
    });

    test("should make ace 1 when previous cards a lower", () => {
        expect(
            calculateDealerScore([
                { name: "5", value: [5] },
                { name: "3", value: [3] },
                { name: "A", value: [1, 11] },
            ])
        ).toEqual(19);
    });

    test("should make ace 11 when previous cards are higher", () => {
        expect(
            calculateDealerScore([
                { name: "8", value: [8] },
                { name: "9", value: [9] },
                { name: "A", value: [1, 11] },
            ])
        ).toEqual(18);
    });

    test("should return correct score when whole hand are aces", () => {
        expect(
            calculateDealerScore([
                { name: "A", value: [1, 11] },
                { name: "A", value: [1, 11] },
                { name: "A", value: [1, 11] },
            ])
        ).toEqual(13);
    });
});

describe("calculateFinal utility function", () => {
    test("should return push when player and dealer have same score", () => {
        expect(calculateFinal(10, 10)).toBe(GameResult.PUSH);
    });

    test("should return win when player has higher score", () => {
        expect(calculateFinal(10, 9)).toBe(GameResult.WIN);
    });

    test("should return lose when dealer has higher score", () => {
        expect(calculateFinal(9, 10)).toBe(GameResult.LOSE);
    });
});

describe("revealHand utility function", () => {
    test("should reveal all cards in hand", () => {
        const hand = [
            { id: 1, name: "2", value: [2], suit: "♦", hidden: true },
            { id: 2, name: "3", value: [3], suit: "♦", hidden: true },
        ];
        expect(revealHand(hand)).toEqual([
            { id: 1, name: "2", value: [2], suit: "♦", hidden: false },
            { id: 2, name: "3", value: [3], suit: "♦", hidden: false },
        ]);
    });
});

describe("checkForBust utility function", () => {
    test("should return push when player and deal go over", () => {
        expect(checkForBust(22, 22)).toEqual(GameResult.PUSH);
    });

    test("should return win when player does not go over and dealer does", () => {
        expect(checkForBust(21, 22)).toEqual(GameResult.WIN);
    });

    test("should return bust when player goes over and dealer does not", () => {
        expect(checkForBust(22, 20)).toEqual(GameResult.BUST);
    });

    test("should return false when neither player nor dealer goes over", () => {
        expect(checkForBust(20, 20)).toEqual("");
    });
});
