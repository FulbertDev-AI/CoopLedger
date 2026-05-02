<?php
namespace App\Http\Controllers;

use App\Services\BlockchainSyncService;
use App\Models\Transaction;

class AnalyticsController extends Controller {
    protected $blockchainSync;
    public function __construct(BlockchainSyncService $blockchainSync) {
        $this->blockchainSync = $blockchainSync;
    }
    // Solde total
    public function balance() {
        $total = $this->blockchainSync->getTotalBalance();
        return response()->json(['solde' => $total]);
    }
    // Dépenses par catégorie
    public function categoryBreakdown() {
        $breakdown = $this->blockchainSync->calculateCategoryBreakdown();
        return response()->json($breakdown);
    }
    // Totaux entrées/sorties
    public function totals() {
        $entrees = Transaction::where('amount', '>', 0)->sum('amount');
        $sorties = Transaction::where('amount', '<', 0)->sum('amount');
        return response()->json([
            'entrees' => $entrees,
            'sorties' => abs($sorties),
            'total' => $entrees + $sorties,
        ]);
    }
}
