import React from 'react';

interface Transaction {
  id: number;
  description: string;
  montant: number;
  date: Date;
  confirme: boolean;
}

interface Props {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-primary">Dernières transactions</h3>
      <ul className="mt-3 space-y-2">
        {transactions.map(tx => (
          <li key={tx.id} className="flex justify-between items-center">
            <div>
              <div className="font-medium">{tx.description}</div>
              <div className="text-sm text-gray-600">{new Date(tx.date).toLocaleString('fr-FR')}</div>
            </div>
            <div className={`font-bold ${tx.montant >= 0 ? 'text-primary' : 'text-red-600'}`}>
              {tx.montant.toLocaleString('fr-FR')} FCFA
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;
