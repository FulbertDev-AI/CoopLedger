<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cooperative extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'contract_address',
        'voting_contract_address',
        'region',
        'total_balance',
    ];
}
