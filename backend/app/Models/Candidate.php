<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    use HasFactory;

    /**
     * The attributes that are assignable;
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'age',
        'linkedin_url',
        'technologies',
      ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => 'datetime:Y-m-d h:m',
        'updated_at' => 'datetime:Y-m-d h:m',
    ];

    //-------------------------------------------
    // Scopes
    //-------------------------------------------

    /**
     * Local scope to filter by candidate's technology.
     *
     * @param  mixed  $query
     * @param  string $filter
     * @return Builder
     */
    public function scopeTechnology($query, string $filter)
    {
        return $query->whereHas('technologies', function (Builder $query) use ($filter) {
            $query->where('technology', 'LIKE', '%' . $filter . '%');
        });
    }

    //-------------------------------------------
    // Acessors
    //-------------------------------------------

    /**
     * Return candidate's list of qualification.
     *
     * @return array
     */
    public function getTechnologiesAttribute($value): array
    {
        return $value == null ? [] : explode(',',$value);
    }
}
