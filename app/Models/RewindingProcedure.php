<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class RewindingProcedure extends Model
{
    use HasFactory;

    protected $fillable = [
        'step',
        'diagnosis_result_id',
        'image',
        'description',
        'comment',
        'user_id'
    ];

    public function result(): BelongsTo
    {
        return $this->belongsTo(Result::class);
    }

    public function users(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
