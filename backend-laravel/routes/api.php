<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\AnalyticsController;

Route::group(['middleware' => ['api']], function () {
    // Authentification
    Route::post('/auth/connect', [AuthController::class, 'connect']);
    Route::get('/auth/verify', [AuthController::class, 'verify'])->middleware('auth:sanctum');

    // Utilisateurs
    Route::get('/users/{address}/role', function($address) {
        // À compléter selon la logique métier
        return response()->json(['role' => 'membre']);
    });

    // Transactions
    Route::get('/transactions', [TransactionController::class, 'index']);
    Route::get('/transactions/{hash}', [TransactionController::class, 'show']);
    Route::post('/transactions', [TransactionController::class, 'store'])->middleware('auth:sanctum');

    // Analytique
    Route::get('/analytics/balance', [AnalyticsController::class, 'balance']);
    Route::get('/analytics/categories', [AnalyticsController::class, 'categoryBreakdown']);
    Route::get('/analytics/totals', [AnalyticsController::class, 'totals']);

    // Votes
    Route::get('/votes/active', [VoteController::class, 'activeVotes']);
    Route::get('/votes/{id}', [VoteController::class, 'show']);
    Route::get('/votes/history/closed', [VoteController::class, 'closedVotes']);
    Route::post('/votes/{id}/vote', [VoteController::class, 'submitVote'])->middleware('auth:sanctum');

    // Rapports
    Route::get('/reports/monthly/{month}/{year}', function($month, $year) {
        // À compléter : génération de rapport mensuel
        return response()->json(['message' => 'Rapport mensuel']);
    });
    Route::get('/reports/download/{month}/{year}', function($month, $year) {
        // À compléter : téléchargement PDF
        return response()->json(['message' => 'Téléchargement PDF']);
    });

    // Webhook blockchain
    Route::post('/blockchain-sync', function() {
        // À compléter : synchronisation blockchain
        return response()->json(['message' => 'Sync blockchain']);
    })->middleware('verify.webhook');
});
