<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Generator extends Model
{
    use HasFactory;

    // protected $fillable = [
    //     'diagnosis_id',
    //     'serial_number',
    //     'user_id',
    // ];
    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function rewindingProcedure(): BelongsToMany
    {
        return $this->belongsToMany(RewindingProcedure::class);
    }

    public function diagnosis(): HasMany
    {
        return $this->HasMany(Diagnosis::class);
    }
}
