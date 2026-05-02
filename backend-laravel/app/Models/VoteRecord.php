<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VoteRecord extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = [
        'vote_id',
        'user_address',
        'choice',
        'voted_at',
    ];
}
