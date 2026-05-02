import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import VotesPage from './pages/VotesPage';
import ReportsPage from './pages/ReportsPage';
import LoginPage from './pages/LoginPage';
import './styles/global.css';
import { WalletProvider } from './context/WalletContext';
import { DataProvider } from './context/DataContext';

const App: React.FC = () => (
  <WalletProvider>
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/votes" element={<VotesPage />} />
          <Route path="/rapports" element={<ReportsPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  </WalletProvider>
);

export default App;
