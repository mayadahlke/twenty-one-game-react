import { dealRandomCard, calculateFinal, checkForBust, GameResult } from "./helpers";

describe("dealRandomCard utility function", () => {
    test("should return last card when 1 is remaining in the deck", () => {
        const card = { id: 1, name: "2", value: [2], suit: "♦" };
        const result = dealRandomCard([card]);
        expect(result).toEqual([card, []]);
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
