import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Deck, { generateDeck } from "./Deck";

describe("<Counter />", () => {
  it("should render 21 cards", async () => {
    render(<Deck />);
    const cards = await screen.findAllByRole('card');
    expect(cards).toHaveLength(21);
  });
});

describe("generateDeck", () => {
  it("should return 21 card objects", () => {
    const deck = generateDeck()
    expect(deck).toHaveLength(21);
  });

  it("should return card objects composed of suit and value", () => {
    const card = generateDeck()[0]
    expect(card).toHaveProperty('suit');
    expect(card).toHaveProperty('value');
  });
});
