import './styles.css';
import ReactModal from 'react-modal';

function Modal({card, state, close}) {

  return (
    <ReactModal 
        isOpen = { state }
        contentLabel='chosenCard'
        className='modal'
        ariaHideApp= { false }
        style={{
          overlay: {
            display: 'flex',
            placeContent: 'center',
          },
          content: {
            placeSelf: 'center'
          }
        }}
    > 
      <h1>Sua carta é</h1>
      <div id='modal_card'>
      <div role='chosenCard' data-testid={ card.suit+card.value } className={ `card ${ card.suit }`  }>
        { card.value }
      </div>
      </div>
      <button id='reset' onClick={ () =>  close() } >Recomeçar</button>
    </ReactModal>
  );
};

export default Modal;
