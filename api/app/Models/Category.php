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

    protected $appends = ['full_path'];

    public function getFullPathAttribute(): string
    {
        $path = str_replace('public/', '', $this->thumb_path);
        $path = str_replace(' ', '%20', $path);
        $path = str_replace('(', '%28', $path);
        $path = str_replace(')', '%29', $path);
        return asset('storage/' . $path, false);
    }

    public function books(): HasMany
    {
        return $this->hasMany(Book::class);
    }
}
