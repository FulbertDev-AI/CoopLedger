import React from 'react';
import { render } from '@testing-library/react';
import TransactionChart from '../TransactionChart';

test('Rend le composant TransactionChart sans erreur', () => {
  const transactions = [
    { categorie: 'Dépense', montant: 1000 },
    { categorie: 'Recette', montant: 2000 },
  ];
  render(<TransactionChart transactions={transactions} />);
});
