import { render, screen } from '@testing-library/react';
import { DarkModeToggle } from '../dark-mode-toggle';

test('renders dark mode toggle', () => {
  render(<DarkModeToggle />);
  const button = screen.getByRole('button', { name: /toggle theme/i });
  expect(button).toBeInTheDocument();
});
