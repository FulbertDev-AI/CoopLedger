import React from 'react';
import { render, screen } from '@testing-library/react';
import BalanceCard from '../BalanceCard';

test('Affiche le solde correctement', () => {
  render(<BalanceCard solde={7000000} />);
  expect(screen.getByText(/Solde total/i)).toBeInTheDocument();
  expect(screen.getByText(/7\s?000\s?000/)).toBeInTheDocument();
});
