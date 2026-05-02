<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;
    protected $fillable = [
        'blockchain_id',
        'description',
        'amount',
        'votes_for',
        'votes_against',
        'deadline',
        'executed',
        'result',
        'cooperative_id',
    ];
}
