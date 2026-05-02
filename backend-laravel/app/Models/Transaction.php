<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = [
        'blockchain_hash',
        'author_address',
        'description',
        'amount',
        'category',
        'transaction_date',
        'confirmed',
        'cooperative_id',
    ];
}
