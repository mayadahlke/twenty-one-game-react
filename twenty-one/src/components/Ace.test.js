import { render, screen, fireEvent } from "@testing-library/react";
import Ace from "./Ace";

test("should return 1 when 1 button is clicked", () => {
    const setCardScoreMock = jest.fn();
    render(<Ace setCardScore={setCardScoreMock} />);

    // Click the button with the name "1"
    const button = screen.getByRole("button", { name: "1" });
    expect(button).toBeTruthy();
    fireEvent.click(button);

    // Check if the setCardScoreMock function was called once with the argument 1
    expect(setCardScoreMock).toHaveBeenCalledTimes(1);
    expect(setCardScoreMock).toHaveBeenCalledWith(1);
});

test("should return 11 when 11 button is clicked", () => {
    const setCardScoreMock = jest.fn();
    render(<Ace setCardScore={setCardScoreMock} />);

    // Click the button with the name "11"
    const button = screen.getByRole("button", { name: "11" });
    expect(button).toBeTruthy();
    fireEvent.click(button);

    // Check if the setCardScoreMock function was called once with the argument 11
    expect(setCardScoreMock).toHaveBeenCalledTimes(1);
    expect(setCardScoreMock).toHaveBeenCalledWith(11);
});
