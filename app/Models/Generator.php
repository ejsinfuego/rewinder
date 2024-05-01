<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Generator extends Model
{
    use HasFactory, Searchable;

    // protected $fillable = [
    //     'diagnosis_id',
    //     'serial_number',
    //     'user_id',
    // ];
     /**
     * Get the indexable data array for the model.
     *
     * @return array<string, mixed>
     */

     public function searchableAs(): string
    {
        return 'generators_index';
    }
    public function toSearchableArray(): array
    {
        $array = $this->toArray();

        return [
            'job_order' => $this->job_order,
            'serial_number' => $this->serial_number,
        ];
    }

    public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'generator_users');
    }

    public function rewindingProcedure(): HasMany
    {
        return $this->HasMany(RewindingProcedure::class);
    }

    public function diagnosis(): HasMany
    {
        return $this->HasMany(Diagnosis::class);
    }

    public function generatorUsers(): HasMany
    {
        return $this->HasMany(GeneratorUser::class);
    }
}
