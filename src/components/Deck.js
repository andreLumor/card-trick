import { useState } from "react";
import './styles.css';

const _ = require('lodash');

const SUITS = ["spades", "hearts", "clubs", "diamonds"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

export const generateDeck = () => { 
  const initialDeck = SUITS.flatMap((suit) => VALUES.flatMap(value => ({suit: suit, value: value})));
  return _.shuffle(initialDeck).slice(0, 21);
}
const DECK = generateDeck()

function Deck() {

  const handleIncrement = () => {
    console.log('ihuu');
  };
  return (
  <div id='main' >
    <div id='buttons'>
      <button onClick={handleIncrement}>Linha 1</button>
      <button onClick={handleIncrement}>Linha 2</button>
      <button onClick={handleIncrement}>Linha 3</button>
    </div>
    <div role='deck' id='cards'>
      {DECK.map(({ value, suit }, index) =>
      <div role='card' key={index} className={ `card ${ suit }`  }>
        {value}
      </div>)}
    </div>
  </div>
  );
};

export default Deck;
