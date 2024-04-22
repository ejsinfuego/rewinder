<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Diagnosis extends Model
{
    use HasFactory;
    protected $table = 'diagnosis'; // Specify the table name
    public function generator(): BelongsTo
    {
        return $this->belongsTo(Generator::class);
    }

    public function result(): HasMany
    {
        return $this->hasMany(Result::class);
    }

}
