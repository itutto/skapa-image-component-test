import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';
import '@ingka/button-webc';
import type { Button } from '@ingka/button-webc';

test('renders learn react link', () => {
  const { container } = render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  
  expect(linkElement).toBeInTheDocument();
  // eslint-disable-next-line testing-library/no-container
  // const button = container.querySelector('skapa-button') as HTMLElement;
  const button = screen.getByText('learn react') as Button;
  act(() => {
    button.focus();
    button.click();  
  })
  
  // expect(button.shadowRoot?.querySelector('button:focus')).toBeTruthy()
  console.log({stuff: button.shadowRoot?.innerHTML });
  // expect(button.control.classList.contains('focus-visible')).toBeTruthy();

});
