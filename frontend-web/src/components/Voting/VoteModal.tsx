import React from 'react';

interface Vote {
  id: number;
  description: string;
  montant: number;
  votesPour: number;
  votesContre: number;
  dateLimite: Date;
  actif: boolean;
  execute: boolean;
}

interface Props {
  vote: Vote | null;
  onClose: () => void;
}

const VoteModal: React.FC<Props> = ({ vote, onClose }) => {
  if (!vote) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-xl">
        <h3 className="text-xl font-semibold text-primary">Détails du vote</h3>
        <p className="mt-3">{vote.description}</p>
        <p className="mt-2 text-sm text-gray-600">Montant : {vote.montant.toLocaleString('fr-FR')} FCFA</p>
        <p className="mt-2 text-sm text-gray-600">Deadline : {new Date(vote.dateLimite).toLocaleString('fr-FR')}</p>
        <div className="mt-4 flex gap-3 justify-end">
          <button className="btn-primary">Voter OUI</button>
          <button className="btn-primary" style={{ background: '#C0392B' }} onClick={onClose}>Fermer</button>
        </div>
      </div>
    </div>
  );
};

export default VoteModal;
