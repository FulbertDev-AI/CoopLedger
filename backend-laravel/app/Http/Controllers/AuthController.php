<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller {
    // Connexion via wallet
    public function connect(Request $request) {
        $validated = $request->validate([
            'wallet_address' => 'required|string',
        ]);
        $user = User::firstOrCreate([
            'wallet_address' => $validated['wallet_address'],
        ]);
        $token = $user->createToken('api-token')->plainTextToken;
        return response()->json([
            'message' => 'Connexion réussie',
            'token' => $token,
            'user' => $user,
        ]);
    }
    // Vérification du token
    public function verify(Request $request) {
        return response()->json([
            'message' => 'Utilisateur authentifié',
            'user' => $request->user(),
        ]);
    }
}
