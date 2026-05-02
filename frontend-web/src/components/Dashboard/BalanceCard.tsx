import React from 'react';

interface Props {
  solde: number;
}

const BalanceCard: React.FC<Props> = ({ solde }) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-primary">Solde total</h3>
      <p className="mt-2 text-2xl font-bold">{solde.toLocaleString('fr-FR')} FCFA</p>
      <p className="mt-1 text-sm text-gray-600">Valeur on-chain consultée en temps réel</p>
    </div>
  );
};

export default BalanceCard;
