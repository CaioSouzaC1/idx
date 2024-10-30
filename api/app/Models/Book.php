<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Book extends Model
{
    /** @use HasFactory<\Database\Factories\BookFactory> */
    use HasFactory, SoftDeletes, HasUuids;

    protected $table = 'books';

    protected $fillable = [
        'title',
        'synopsis',
        'category_id',
        'pdf_path',
        'thumb_path',
        'redirect_url'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function readers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_has_read_books', 'book_id', 'user_id')
            ->withPivot('percentage')
            ->withTimestamps();
    }
}
