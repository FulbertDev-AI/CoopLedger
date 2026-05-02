import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, Vote } from '../types';
import web3Service from '../services/web3Service';
import apiService from '../services/apiService';

export interface DataContextProps {
  solde: number;
  transactions: Transaction[];
  votes: Vote[];
  chargement: boolean;
  rafraichir: () => Promise<void>;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [solde, setSolde] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [chargement, setChargement] = useState(true);

  const rafraichir = async () => {
    setChargement(true);
    try {
      const soldeData = await web3Service.getBalance();
      const txs = await web3Service.getTransactions();
      const votesData = await web3Service.getActiveVotes();
      setSolde(soldeData);
      setTransactions(txs);
      setVotes(votesData);
    } finally {
      setChargement(false);
    }
  };

  useEffect(() => {
    rafraichir();
  }, []);

  return (
    <DataContext.Provider value={{ solde, transactions, votes, chargement, rafraichir }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData doit être utilisé dans DataProvider');
  return context;
};
