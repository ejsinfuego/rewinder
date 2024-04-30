<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class GeneratorUser extends Model
{
    use HasFactory;


    protected $fillable = [
        'generator_id',
        'user_id',
        'status'
    ];

    protected $table = 'generator_users';

    public function generator(): BelongsToMany
    {
        return $this->belongsToMany(Generator::class);
    }

    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }
}
