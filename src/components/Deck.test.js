import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Deck, { generateDeck } from "./Deck";

describe("<Deck />", () => {
  beforeEach(() => {
    render(<Deck />);
  });

  it("should render 21 cards", () => {
    const cards = screen.getAllByRole('card');
    expect(cards).toHaveLength(21);
  });

  it("should place chosen card on position 11 after three line selections", () => {
    const deck = screen.getAllByRole('card');
    //select a card from the deck
    const chosenCard = deck.at(0)
    const chosenCardSuit = chosenCard.className.split(' ')[1]
    const chosenCardValue=  chosenCard.textContent

    
    //Find the card and click the button representing its line 3 times
    for (let index = 0; index < 3; index++) {
      const card = screen.getByTestId(chosenCardValue+chosenCardSuit);
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
    const card = screen.getByTestId(chosenCardValue+chosenCardSuit);
    const cardPosition = card.attributes.currentid.value
    expect(cardPosition).toBe('10');

    //Check if modal was rendered
    expect(screen.queryByText('Sua carta é')).toBeInTheDocument()
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

describe("closeModal", () => {
  it("should call setDeck", () => {
    render(<Deck initialModalState = { true } />); //Creates a page with visible modal
    const oldDeck = screen.getByRole('deck').outerHTML;
    const button = screen.getByText('Recomeçar')
    userEvent.click(button) //Clicks reset
    const newDeck = screen.getByRole('deck').outerHTML;
    expect(oldDeck).not.toStrictEqual(newDeck);
  });
});
