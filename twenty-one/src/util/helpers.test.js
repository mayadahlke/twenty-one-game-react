import {
    dealRandomCard,
    calculatePlayerScore,
    calculateFinal,
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
        calculatePlayerScore({ name: "2", value: [2] }, { name: "3", value: [3] });
        expect(calculatePlayerScore({ name: "2", value: [2] }, { name: "3", value: [3] })).toEqual([5, 0]);
    });

    test("should return correct score and ace count when first card is ace", () => {
        calculatePlayerScore({ name: "A", value: [1, 11] }, { name: "3", value: [3] });
        expect(calculatePlayerScore({ name: "A", value: [1, 11] }, { name: "3", value: [3] })).toEqual([3, 1]);
    });

    test("should return correct score and ace count when second card is ace", () => {
        calculatePlayerScore({ name: "5", value: [5] }, { name: "A", value: [1, 11] });
        expect(calculatePlayerScore({ name: "5", value: [5] }, { name: "A", value: [1, 11] })).toEqual([5, 1]);
    });

    test("should return correct score and ace count when there are 2 aces in hand", () => {
        calculatePlayerScore({ name: "A", value: [1, 11] }, { name: "A", value: [1, 11] });
        expect(calculatePlayerScore({ name: "A", value: [1, 11] }, { name: "A", value: [1, 11] })).toEqual([0, 2]);
    });
});

describe("calculateFinal utility function", () => {
    test("should return push when player and dealer have same score", () => {
        calculateFinal(10, 10);
        expect(calculateFinal(10, 10)).toBe(GameResult.PUSH);
    });

    test("should return win when player has higher score", () => {
        calculateFinal(10, 9);
        expect(calculateFinal(10, 9)).toBe(GameResult.WIN);
    });

    test("should return lose when dealer has higher score", () => {
        calculateFinal(9, 10);
        expect(calculateFinal(9, 10)).toBe(GameResult.LOSE);
    });
});

describe("checkForBust utility function", () => {
    test("should return push when player and deal go over", () => {
        checkForBust(22, 22);
        expect(checkForBust(22, 22)).toEqual([true, GameResult.PUSH]);
    });

    test("should return win when player does not go over and dealer does", () => {
        checkForBust(21, 22);
        expect(checkForBust(21, 22)).toEqual([true, GameResult.WIN]);
    });

    test("should return bust when player goes over and dealer does not", () => {
        checkForBust(22, 20);
        expect(checkForBust(22, 20)).toEqual([true, GameResult.BUST]);
    });

    test("should return false when neither player nor dealer goes over", () => {
        checkForBust(20, 20);
        expect(checkForBust(20, 20)).toEqual([false, ""]);
    });
});
