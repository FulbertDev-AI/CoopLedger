import React from 'react';
import { render, screen } from '@testing-library/react';
import VoteCard from '../VoteCard';

const vote = {
  id: 1,
  description: 'Achat tracteur',
  montant: 450000,
  votesPour: 8,
  votesContre: 2,
  dateLimite: new Date(Date.now() + 1000 * 60 * 60 * 24),
  actif: true,
  execute: false,
};

test('Affiche VoteCard', () => {
  render(<VoteCard vote={vote} />);
  expect(screen.getByText(/Achat tracteur/)).toBeInTheDocument();
});
