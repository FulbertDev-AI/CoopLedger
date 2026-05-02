<?php
namespace App\Services;

use App\Models\Transaction;
use App\Models\Vote;
use Illuminate\Support\Facades\Log;

class BlockchainSyncService {
    // Synchronisation des transactions depuis la blockchain
    public function syncTransactions($events) {
        foreach ($events as $event) {
            Transaction::updateOrCreate(
                ['blockchain_hash' => $event['hash']],
                [
                    'author_address' => $event['author'],
                    'description' => $event['description'],
                    'amount' => $event['amount'],
                    'category' => $event['category'],
                    'transaction_date' => now(),
                    'confirmed' => true,
                    'cooperative_id' => 1,
                ]
            );
        }
        Log::info('Transactions synchronisées');
    }
    // Synchronisation des votes depuis la blockchain
    public function syncVotes($events) {
        foreach ($events as $event) {
            Vote::updateOrCreate(
                ['blockchain_id' => $event['id']],
                [
                    'description' => $event['description'],
                    'amount' => $event['amount'],
                    'votes_for' => $event['votesFor'],
                    'votes_against' => $event['votesAgainst'],
                    'deadline' => $event['deadline'],
                    'executed' => $event['executed'],
                ]
            );
        }
        Log::info('Votes synchronisés');
    }
    // Dépenses par catégorie
    public function calculateCategoryBreakdown() {
        return Transaction::selectRaw('category, SUM(amount) as total')
            ->groupBy('category')
            ->pluck('total', 'category')
            ->toArray();
    }
    // Solde total
    public function getTotalBalance() {
        return Transaction::sum('amount');
    }
}
