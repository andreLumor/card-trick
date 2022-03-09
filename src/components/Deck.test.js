import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Deck, { generateDeck } from "./Deck";

describe("<Deck />", () => {
  it("should render 21 cards", async () => {
    render(<Deck />);
    const cards = await screen.findAllByRole('card');
    expect(cards).toHaveLength(21);
  });

  it("should place chosen card on position 11 after three line selections", async () => {
    render(<Deck />);
    const deck = await screen.findAllByRole('card');
    //select a card from the deck
    const chosenCard = deck.at(0)
    const chosenCardSuit = chosenCard.className.split(' ')[1]
    const chosenCardValue=  chosenCard.textContent

    
    //Find the card and click the button representing its line 3 times
    for (let index = 0; index < 3; index++) {
      const card = await screen.getByTestId(chosenCardValue+chosenCardSuit);
      const cardPosition = card.attributes.currentid.value
      if (cardPosition<7){ 
        userEvent.click(screen.getByText('Linha 1'))
      }else if(cardPosition<14){
        userEvent.click(screen.getByText('Linha 2'))
      }else{
        userEvent.click(screen.getByText('Linha 3'))
      }

    }
    
    //Find the final card position
    const card = await screen.getByTestId(chosenCardValue+chosenCardSuit);
    const cardPosition = card.attributes.currentid.value
    expect(cardPosition).toBe('10');
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
