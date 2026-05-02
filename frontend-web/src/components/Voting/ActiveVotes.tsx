import React from 'react';
import VoteCard from './VoteCard';

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
  votes: Vote[];
}

const ActiveVotes: React.FC<Props> = ({ votes }) => {
  if (votes.length === 0) return <div className="card">Aucun vote actif pour le moment.</div>;

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-primary">Votes actifs</h3>
      <div className="mt-3 space-y-3">
        {votes.map(v => (
          <VoteCard key={v.id} vote={v} />
        ))}
      </div>
    </div>
  );
};

export default ActiveVotes;
