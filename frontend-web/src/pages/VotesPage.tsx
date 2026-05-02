import React, { useState, useMemo } from 'react';
import VoteCard from '../components/Voting/VoteCard';
import VoteModal from '../components/Voting/VoteModal';
import { useData } from '../context/DataContext';

const VotesPage: React.FC = () => {
  const { votes } = useData();
  const [voteSelectionne, setVoteSelectionne] = useState<any>(null);
  const [afficherModal, setAfficherModal] = useState(false);

  const votesActifs = useMemo(() => votes.filter(v => new Date(v.dateLimite) > new Date()), [votes]);
  const votesClotures = useMemo(() => votes.filter(v => new Date(v.dateLimite) <= new Date()), [votes]);

  return (
    <div className="votes-container">
      <h1>Votes et décisions</h1>
      <h2>Votes actifs ({votesActifs.length})</h2>
      <div className="votes-grid">
        {votesActifs.map(vote => (
          <VoteCard
            key={vote.id}
            vote={vote}
            onVote={() => {
              setVoteSelectionne(vote);
              setAfficherModal(true);
            }}
          />
        ))}
      </div>
      <h2>Votes clôturés ({votesClotures.length})</h2>
      <div className="votes-grid">
        {votesClotures.map(vote => (
          <VoteCard key={vote.id} vote={vote} readonly />
        ))}
      </div>
      {afficherModal && (
        <VoteModal
          vote={voteSelectionne}
          onClose={() => setAfficherModal(false)}
        />
      )}
    </div>
  );
};

export default VotesPage;
