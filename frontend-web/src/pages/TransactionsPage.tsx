import React, { useState, useMemo } from 'react';
import TransactionList from '../components/Transactions/TransactionList';
import TransactionFilters from '../components/Transactions/TransactionFilters';
import { useData } from '../context/DataContext';

const TransactionsPage: React.FC = () => {
  const { transactions } = useData();
  const [filtres, setFiltres] = useState({ categorie: '', minMontant: 0, maxMontant: 0 });
  const [page, setPage] = useState(1);
  const itemsParPage = 20;

  const transactionsFiltrees = useMemo(() => {
    let result = transactions;
    if (filtres.categorie) {
      result = result.filter(t => t.categorie === filtres.categorie);
    }
    if (filtres.minMontant) {
      result = result.filter(t => t.montant >= filtres.minMontant);
    }
    if (filtres.maxMontant) {
      result = result.filter(t => t.montant <= filtres.maxMontant);
    }
    return result;
  }, [transactions, filtres]);

  const transactionsPage = useMemo(() =>
    transactionsFiltrees.slice((page - 1) * itemsParPage, page * itemsParPage),
    [transactionsFiltrees, page]
  );

  return (
    <div className="transactions-container">
      <h1>Historique des transactions</h1>
      <TransactionFilters onFilter={setFiltres} />
      <TransactionList transactions={transactionsPage} />
      <div className="pagination">
        {Array.from({ length: Math.ceil(transactionsFiltrees.length / itemsParPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={page === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionsPage;
