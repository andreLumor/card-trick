import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

describe('Modal component', () => {
  const mockedFunc = jest.fn();
  beforeEach(() => {
    const card = { suit: 'spades', value: 'A' }
    const state = true
    render(
      <Modal card={ card } state= { state } close= {() => mockedFunc()}/>
    )
  });

  it('renders the correct card', async () => {
    const card = await screen.findByRole('chosenCard');
    expect(card).toHaveAttribute('data-testid', 'spadesA');
  });

  it('calls callback function on button click', async () => {
    userEvent.click(screen.getByText('Recomeçar'));
    expect(mockedFunc).toHaveBeenCalled();
  });
})
