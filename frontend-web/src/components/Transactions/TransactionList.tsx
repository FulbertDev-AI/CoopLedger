import React from 'react';

interface Transaction {
  id: number;
  description: string;
  montant: number;
  categorie: string;
  date: Date;
  auteur: string;
  hash?: string;
  confirme: boolean;
}

interface Props {
  transactions: Transaction[];
}

const TransactionList: React.FC<Props> = ({ transactions }) => {
  return (
    <div className="card">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">Date</th>
            <th className="text-left">Description</th>
            <th className="text-right">Montant</th>
            <th className="text-left">Catégorie</th>
            <th className="text-left">Auteur</th>
            <th className="text-left">Hash</th>
            <th className="text-left">Statut</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id} className="border-t">
              <td>{new Date(tx.date).toLocaleDateString('fr-FR')}</td>
              <td>{tx.description}</td>
              <td className="text-right">{tx.montant.toLocaleString('fr-FR')} FCFA</td>
              <td>{tx.categorie}</td>
              <td>{tx.auteur}</td>
              <td>{tx.hash ? <a href={`https://sepolia.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noreferrer">{tx.hash.slice(0,8)}...</a> : '-'}</td>
              <td>{tx.confirme ? <span className="text-green-600">✓ confirmé</span> : <span className="text-gray-600">⏳ en attente</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
