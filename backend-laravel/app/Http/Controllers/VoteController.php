<?php
namespace App\Http\Controllers;

use App\Models\Vote;
use App\Models\VoteRecord;
use Illuminate\Http\Request;

class VoteController extends Controller {
    // Votes actifs
    public function activeVotes() {
        $votes = Vote::where('deadline', '>', now())
            ->where('executed', false)
            ->get();
        return response()->json($votes);
    }
    // Détail d'un vote
    public function show($id) {
        $vote = Vote::findOrFail($id);
        $records = VoteRecord::where('vote_id', $id)->get();
        return response()->json([
            'vote' => $vote,
            'records' => $records,
        ]);
    }
    // Soumettre un vote
    public function submitVote(Request $request, $id) {
        $validated = $request->validate(['choice' => 'required|boolean']);
        VoteRecord::create([
            'vote_id' => $id,
            'user_address' => auth()->user()->wallet_address,
            'choice' => $validated['choice'],
        ]);
        return response()->json(['message' => 'Vote enregistré'], 201);
    }
    // Votes clôturés
    public function closedVotes() {
        $votes = Vote::where('executed', true)->get();
        return response()->json($votes);
    }
}
