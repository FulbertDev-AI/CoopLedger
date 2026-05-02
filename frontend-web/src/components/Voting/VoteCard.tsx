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
  vote: Vote;
  onVote?: () => void;
  readonly?: boolean;
}

const VoteCard: React.FC<Props> = ({ vote, onVote, readonly }) => {
  const total = vote.votesPour + vote.votesContre;
  const pourPct = total === 0 ? 0 : Math.round((vote.votesPour / total) * 100);
  const contrePct = total === 0 ? 0 : Math.round((vote.votesContre / total) * 100);

  return (
    <div className="card">
      <h4 className="font-semibold text-primary">{vote.description}</h4>
      <div className="text-sm text-gray-600">Montant : {vote.montant.toLocaleString('fr-FR')} FCFA</div>
      <div className="mt-2">
        <div className="flex justify-between text-sm">
          <span>OUI : {vote.votesPour} ({pourPct}%)</span>
          <span>NON : {vote.votesContre} ({contrePct}%)</span>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <div className="text-sm text-gray-600">Deadline : {new Date(vote.dateLimite).toLocaleString('fr-FR')}</div>
        {!readonly && (
          <button onClick={onVote} className="btn-primary">Voter maintenant</button>
        )}
      </div>
    </div>
  );
};

export default VoteCard;
