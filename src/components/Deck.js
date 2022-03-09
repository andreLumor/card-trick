import { useState } from "react";
import './styles.css';
const _ = require('lodash');

const SUITS = ["spades", "hearts", "clubs", "diamonds"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export const generateDeck = () => { 
  const initialDeck = SUITS.flatMap((suit) => VALUES.flatMap(value => ({suit: suit, value: value})));
  return _.shuffle(initialDeck).slice(0, 21);
}


function Deck() {
  const [deck, setDeck]  = useState(generateDeck());

  const trickStep = (initialLine) => { 
    //Place chosen line on the middle of the array
    const initialPosition = (initialLine)*7; //0, 7 or 14 new array start
    const stackedDeck = [[...deck].splice(initialPosition, 21), [...deck].splice(0, initialPosition)].flat()
    
    //Reorder cards in three lines
    const newDeck = stackedDeck.reduce((acc, element, index) =>{
      acc[index%3] = [...acc[index%3], element] 
      return(acc)
    }, [[], [], []]);

    setDeck(newDeck.flat());
  };

  return (
  <div id='main' >
    <div id='buttons'>
      <button onClick={() => trickStep(2)}>Linha 1</button>
      <button onClick={() => trickStep(0)}>Linha 2</button>
      <button onClick={() => trickStep(1)}>Linha 3</button>
    </div>
    <div role='deck' id='cards'>
      {deck.map(({ value, suit }, index) =>
      <div role='card' currentid={index} data-testid={value+suit} key={index} className={ `card ${ suit }`  }>
        {value}
      </div>)}
    </div>
  </div>
  );
};

export default Deck;
