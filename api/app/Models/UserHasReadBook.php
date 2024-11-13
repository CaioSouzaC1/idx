<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserHasReadBook extends Model
{
    use HasFactory, HasUuids;

    protected $table = "user_has_read_books";
    protected $fillable = [
        'book_id',
        'user_id',
        'page'
    ];


    public function book()
    {
        return $this->belongsTo(Book::class, 'book_id', 'id');
    }

    protected static function booted()
    {
        static::addGlobalScope('withBook', function ($query) {
            $query->with('book');
        });
    }
}
