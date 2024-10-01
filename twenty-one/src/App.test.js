import { render, screen } from "@testing-library/react";
import App from "./App";

test("should have title", () => {
    render(<App />);

    // Check if the title is rendered
    const title = screen.getByText("Twenty One");
    expect(title).toBeTruthy();
});

