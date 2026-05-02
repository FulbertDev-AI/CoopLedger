import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface WalletContextProps {
  compte: string | null;
  provider: any;
  connecterWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [compte, setCompte] = useState<string | null>(null);
  const [provider, setProvider] = useState<any>(null);

  const connecterWallet = async () => {
    if (!(window as any).ethereum) throw new Error('MetaMask non installé');
    const comptes = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    setCompte(comptes[0]);
    setProvider((window as any).ethereum);
  };

  return (
    <WalletContext.Provider value={{ compte, provider, connecterWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet doit être utilisé dans WalletProvider');
  return context;
};
