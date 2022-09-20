import { render, screen } from '@testing-library/react';
import App from './App';

test('renders basic registration form', async () => {
  render(<App />);
  await screen.findByRole('heading');

  expect(screen.getByRole('heading')).toHaveTextContent(
    'Hello to #futureShaper'
  );
});

test('renders form with disable button', () => {
  render(<App />);

  const button = screen.getByRole('button', { name: `Let's shape the future` });
  expect(button).toHaveAttribute('disabled');
});
