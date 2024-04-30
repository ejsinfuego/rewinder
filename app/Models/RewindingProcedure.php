<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RewindingProcedure extends Model
{
    use HasFactory;

    protected $fillable = [
        'step',
        'image',
        'description',
        'comment',
        'diagnosis_id',
        'image'
    ];

    public function generator(): BelongsTo
    {
        return $this->belongsTo(Generator::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'rewinding_id', 'procedure_id');
    }
}
