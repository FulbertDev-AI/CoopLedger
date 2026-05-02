import React, { useState } from 'react';

interface Props {
  onFilter: (filters: any) => void;
}

const TransactionFilters: React.FC<Props> = ({ onFilter }) => {
  const [categorie, setCategorie] = useState('');
  const [minMontant, setMinMontant] = useState<number | ''>('');
  const [maxMontant, setMaxMontant] = useState<number | ''>('');

  const apply = () => {
    onFilter({ categorie, minMontant: minMontant || undefined, maxMontant: maxMontant || undefined });
  };

  return (
    <div className="card mb-4">
      <div className="flex gap-4">
        <select value={categorie} onChange={e => setCategorie(e.target.value)} className="p-2 border rounded-md w-1/3">
          <option value="">Toutes catégories</option>
          <option value="Dépense">Dépense</option>
          <option value="Recette">Recette</option>
          <option value="Cotisation">Cotisation</option>
        </select>
        <input type="number" value={minMontant === '' ? '' : minMontant} onChange={e => setMinMontant(e.target.value === '' ? '' : Number(e.target.value))} placeholder="Montant min" className="p-2 border rounded-md w-1/3" />
        <input type="number" value={maxMontant === '' ? '' : maxMontant} onChange={e => setMaxMontant(e.target.value === '' ? '' : Number(e.target.value))} placeholder="Montant max" className="p-2 border rounded-md w-1/3" />
        <button onClick={apply} className="btn-primary">Appliquer</button>
      </div>
    </div>
  );
};

export default TransactionFilters;
