<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class)->withDefault();
    }

    public function generator()
    {
        return $this->belongsTo(Generator::class);
    }

    public function rewinding(): BelongsTo
    {
        return $this->belongsTo(RewindingProcedure::class, 'rewinding_id');
    }
}
