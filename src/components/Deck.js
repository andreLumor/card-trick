import Modal from "./Modal";
import { useState } from "react";
import './styles.css';
const _ = require('lodash');

const SUITS = ["spades", "hearts", "clubs", "diamonds"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const LINE_SIZE = 7
const LINE_SHIFT = 2
const N_LINES = 3

export const generateDeck = (removeCard = null) => { 
  var initialDeck = SUITS.flatMap((suit) => VALUES.map(value => ({suit: suit, value: value})));
  initialDeck = _.without(initialDeck, removeCard)
  return _.shuffle(initialDeck).slice(0, 21);
}

function Deck( { initialModalState = false } ) {
  const [deck, setDeck]  = useState(generateDeck());
  const [modalState, setModal]  = useState(initialModalState);
  const [step, setStep]  = useState(1);

  const showModal = () => {
    setModal(true);
  }
  const trickStep = (Line) => { 
    setStep(step+1);
    //Place chosen line on the middle of the array
    const initialPosition = (Line+LINE_SHIFT)*LINE_SIZE%deck.length; //0, 7 or 14 new array start
    const stackedDeck = [[...deck].splice(initialPosition, deck.length), [...deck].splice(0, initialPosition)].flat()
    
    //Reorder cards in three lines
    const newDeck = stackedDeck.reduce((acc, element, index) =>{
      acc[index%N_LINES] = [...acc[index%3], element] 
      return(acc)
    }, [[], [], []]);

    setDeck(newDeck.flat());
    if(step === 3){
      showModal()
    }
  };
  
  const closeModal = () => {
    setDeck(generateDeck(deck[10]));
    setStep(1);
    setModal(false);
 }

  return (
  <div id='main' >
    <div id='buttons'>
      <button onClick={() => trickStep(0)}>Linha 1</button>
      <button onClick={() => trickStep(1)}>Linha 2</button>
      <button onClick={() => trickStep(2)}>Linha 3</button>
    </div>
    <div role='deck' id='cards'>
      {deck.map(({ value, suit }, index) =>
      <div role='card' currentid={ index } data-testid={value+suit} key={ index } className={ `card ${ suit }`  }>
        {value}
      </div>)}
    </div>
    <Modal card={ deck[10] } state= { modalState } close= {() => closeModal()}/>
  </div>
  );
};

export default Deck;
