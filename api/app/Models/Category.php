<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'categories';

    protected $fillable = [
        'name',
        'description',
        'thumb_path'
    ];


    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }
}
