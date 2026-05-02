import React, { useEffect, useMemo } from 'react';
import { useWallet } from '../context/WalletContext';
import { useData } from '../context/DataContext';
import BalanceCard from '../components/Dashboard/BalanceCard';
import TransactionChart from '../components/Dashboard/TransactionChart';
import ActiveVotes from '../components/Voting/ActiveVotes';
import RecentTransactions from '../components/Dashboard/RecentTransactions';

const DashboardPage: React.FC = () => {
  const { compte, provider } = useWallet();
  const { solde, transactions, votes, chargement } = useData();

  useEffect(() => {
    // Chargement des données au montage
  }, [compte, provider]);

  if (chargement) return <div>Chargement…</div>;

  const votesActifs = useMemo(() => votes.filter(v => v.actif), [votes]);
  const transactionsRecentes = useMemo(() => transactions.slice(0, 5), [transactions]);

  return (
    <div className="dashboard-container">
      <h1>Tableau de bord</h1>
      <BalanceCard solde={solde} />
      <div className="grid grid-cols-2 gap-4 mt-6">
        <TransactionChart transactions={transactions} />
        <ActiveVotes votes={votesActifs} />
      </div>
      <RecentTransactions transactions={transactionsRecentes} />
      <a href="/transactions" className="btn-primary mt-4">Voir tout</a>
    </div>
  );
};

export default DashboardPage;
