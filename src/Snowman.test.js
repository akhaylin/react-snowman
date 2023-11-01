import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Snowman from './Snowman';
import * as random from './words.js'
random.randomWord = jest.fn()

test('game ends after MaxWrong guesses', () => {
  random.randomWord.mockReturnValue("apple")
  const { container } = render(<Snowman maxWrong={6} />);

  fireEvent.click(container.querySelector('button[value="z"]'));
  fireEvent.click(container.querySelector('button[value="x"]'));
  fireEvent.click(container.querySelector('button[value="v"]'));
  fireEvent.click(container.querySelector('button[value="k"]'));
  fireEvent.click(container.querySelector('button[value="j"]'));
  fireEvent.click(container.querySelector('button[value="q"]'));

  // After 6 wrong guesses, "You lose" message should appear
  expect(container.querySelector('.Snowman')).toHaveTextContent('You lose!');

  // Check that buttons aren't visible anymore by trying to access one and expecting it to be null
  expect(container.querySelector('button[value="a"]')).not.toBeInTheDocument();
  expect(container.querySelector('button[value="b"]')).not.toBeInTheDocument();


  // Check if the correct word is displayed
  expect(container.querySelector('.Snowman-correctWord')).toBeInTheDocument('apple');
})

it("matches snapshot", function() {
  random.randomWord.mockReturnValue("apple")
  const { container } = render(<Snowman maxWrong={6} />);

  fireEvent.click(container.querySelector('button[value="z"]'));
  fireEvent.click(container.querySelector('button[value="x"]'));
  fireEvent.click(container.querySelector('button[value="v"]'));
  fireEvent.click(container.querySelector('button[value="k"]'));
  fireEvent.click(container.querySelector('button[value="j"]'));
  fireEvent.click(container.querySelector('button[value="q"]'));

  expect(container).toMatchSnapshot();
});