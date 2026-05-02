<?php
namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller {
    // Liste paginée des transactions
    public function index(Request $request) {
        $query = Transaction::query();
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }
        if ($request->has('min_amount')) {
            $query->where('amount', '>=', $request->min_amount);
        }
        if ($request->has('max_amount')) {
            $query->where('amount', '<=', $request->max_amount);
        }
        $transactions = $query->orderBy('transaction_date', 'desc')->paginate(20);
        return response()->json($transactions);
    }
    // Détail d'une transaction
    public function show($hash) {
        $transaction = Transaction::where('blockchain_hash', $hash)->firstOrFail();
        return response()->json($transaction);
    }
    // Création d'une transaction
    public function store(Request $request) {
        $validated = $request->validate([
            'description' => 'required|string',
            'amount' => 'required|numeric',
            'category' => 'required|string',
        ]);
        $transaction = Transaction::create([
            ...$validated,
            'author_address' => auth()->user()->wallet_address,
            'cooperative_id' => 1,
        ]);
        return response()->json($transaction, 201);
    }
}
